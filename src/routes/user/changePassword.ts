import express from "express";
import argon2 from "argon2";
import checkAuth from "../../helpers/authChecker.js";
import User from "../../models/user.js";

const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

router.post(
  "/changePassword",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    if (!req.body.oldPassword || !req.body.newPassword) {
      res.status(422).json({
        success: false,
        error: "Missing body parameters",
      });
      return;
    }
    let userData = await User.findById(req.user.id);
    const isCorrect = await argon2.verify(
      userData.password,
      req.body.oldPassword
    );
    if (!isCorrect) {
      res.status(401).json({
        success: false,
        error: "Old password is incorrect",
      });
      return;
    }
    userData.password = await argon2.hash(req.body.newPassword);
    await userData.save();
    res.status(200).json({
      success: true,
    });
  }
);

export default router;
