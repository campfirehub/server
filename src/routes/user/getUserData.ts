import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import User from "../../models/user.js";

const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

router.get("/user/:id", async (req: express.Request, res: express.Response) => {
  const userData = await User.findById(req.params.id);
  if (!userData) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    data: {
      username: userData.username,
      avatar: userData.avatar,
    },
  });
});

export default router;
