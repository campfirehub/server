import express from "express";
import User from "../../models/user.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../../config.js";
const router = express.Router();

/* 
Path: "/login"
Method: POST
Body: {
    "username": "actual username",
    "password": "actual password"
}
*/

router.post("/login", async (req: express.Request, res: express.Response) => {
  if (!req.body.username || !req.body.password) {
    res.status(422).json({
      success: false,
      error: "Missing body parameters",
    });
    return;
  }
  if (!(await User.exists({ username: req.body.username }))) {
    res.status(404).json({
      success: false,
      error: "Username / password is invalid",
    });
    return;
  }
  const userData = await User.findOne({ username: req.body.username });
  try {
    if (await argon2.verify(userData.password, req.body.password)) {
      const token = jwt.sign(
        { username: userData.username, id: userData._id, loggedAt: Date.now() },
        config.auth.jwt_secret,
        { expiresIn: config.auth.expiresIn }
      );
      res.status(200).json({
        success: true,
        data: {
          token: token,
          username: userData.username,
          userId: userData._id,
          completedSetup: userData.completedSetup,
          avatarUrl: userData.avatarUrl,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        error: "Username / password is invalid",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
});

export default router;
