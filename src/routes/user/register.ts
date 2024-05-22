import express from "express";
import User from "../../models/user.js";
import argon2 from "argon2";
const router = express.Router();

const saltRounds = 10;

/* 
Path: "/register"
Method: POST
Body: {
    "username": "actual username",
    "password": "actual password"
}
*/

router.post(
  "/register",
  async (req: express.Request, res: express.Response) => {
    if (!req.body.username || !req.body.password) {
      res.status(422).json({
        success: false,
        error: "Missing body parameters",
      });
      return;
    }
    if (req.body.username.length > 20 || req.body.password.length > 20) {
      res.status(400).json({
        success: false,
        error: "Username or password too long",
      });
      return;
    }
    // if (req.body.age < 11) {
    //   res.status(400).json({
    //     success: false,
    //     error: "Too young for this platform, pleace check our Terms Of Service",
    //   });
    //   return;
    // }
    if (await User.exists({ username: req.body.username })) {
      res.status(409).json({
        success: false,
        error: "Username already exists",
      });
      return;
    }
    try {
      const hash = await argon2.hash(req.body.password);
      await User.create({
        username: req.body.username,
        password: hash,
      });
      res.status(201).json({
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
      console.error(err);
      return;
    }
  }
);

export default router;
