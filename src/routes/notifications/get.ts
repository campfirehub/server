import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import Notification from "../../models/Notification.js";
const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

router.get(
  "/notifications",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    let paginateConfig = {
      limit: 10,
      page: 1,
    };
    if (!isNaN(Number(req.query?.page)))
      paginateConfig.page = Number(req.query.page);
    const data = await Notification.paginate(
      { to: req.user.id },
      { limit: 10 }
    );
    res.status(200).json({
      success: true,
      data: data,
    });
  }
);

export default router;
