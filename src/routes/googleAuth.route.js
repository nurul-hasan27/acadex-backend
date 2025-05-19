import express from "express";
import {googleLogin} from "../controllers/googleLogin.controller.js";

const router = express.Router();

// router.get("/test", (req, res) => {
//   res.send("hello from test");
// });

router.get("/google", googleLogin);

export default router;
