import {oauth2client} from '../utils/googleConfig.js';
import axios from "axios";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const options = {
    httpOnly: true,
    secure: true
}

const googleLogin = async(req, res)=>{
    try{
        const {code} = req.query;
        console.log(code);
        console.log(`redirected URI = ${process.env.GOOGLE_REDIRECT_URI}`)
        const googleResponse = await oauth2client.getToken(code);
        console.log(`google Response = ${googleResponse}`);
        oauth2client.setCredentials(googleResponse.tokens);
        console.log("finish 37");
        // console.log(`access token --> ${googleResponse.tokens.access_token}`);
        // console.log(`refresh token --> ${googleResponse.tokens.refresh_token}`)
        const user = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);
        const {id, email, name, picture} = user.data;
        console.log("user data");
        console.log(user.data);
        
        const existedUser = await User.findOne({ email });
        if(!existedUser){
            const userReturned = await User.create({
                username: name,
                email:email, 
                avatar: picture,
            })
            const createdUser = await User.findById(userReturned._id).select(
                "-refreshToken"
            )
    
            if (!createdUser) {
                throw new ApiError(500, "Something went wrong while registering the user")
            }else{
                const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(userReturned._id);
                
                return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new ApiResponse(
                        200, 
                        {
                            user: loggedInUser, accessToken, refreshToken
                        },
                        "User registered and logged In Successfully"
                    )
                )
            }
        }else{
            const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(userReturned._id);
                
            return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200, 
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "User registered and logged In Successfully"
                )
            )
        }
    }catch(err){
        console.log(err); 
        res
        .status(400)
        .json(
            new ApiError(
                400, "Error in registering and logging the user with google"
            )
        )
    }
};

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

export {
    googleLogin,
    logoutUser,
    refreshAccessToken,
}