import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const backendAPI = "http://localhost:3000";

//this creates the google pop up not the new window.
export function GoogleLogin() {
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        console.log(`google login result ==> ${authResult.name}`);
        const result = await axios.get(
          `${backendAPI}/auth/google?code=${authResult["code"]}`
        );
        console.log(result);
        // const { email, name, picture, id} = result.data.user;
   
        // localStorage.setItem("accessToken", result.data.accessToken);
        // console.log( email, name, picture, id);
      }
    } catch (error) {
      console.log("error while requesting google auth code", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <div>
      <button onClick={googleLogin}>
        {/* login with google */}
        google login
      </button>
    </div>
  );
}
