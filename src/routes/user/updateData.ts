import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import User from "../../models/user.js";

const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

router.post(
  "/user/update",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    if (!req.body.username && !req.body.avatar) {
      res.status(422).json({
        success: false,
        error: "Missing body parameters",
      });
      return;
    }
    let userData = await User.findById(req.user.id);
    if (req.body.username) userData.username = req.body.username;
    if (req.body.avatar) userData.avatar = req.body.avatar;
    await userData.save();
    res.status(200).json({
      success: true,
    });
  }
);

export default router;
