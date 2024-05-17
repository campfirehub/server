import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import Project from "../../models/project.js";
import config from "../../config.js";
import axios from "axios";
const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

router.post(
  "/image/upload",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    let projectData;
    if (!req.body.image)
      return res.status(422).json({
        success: false,
        error: "No image provided",
      });
    // ------------
    const formData = new FormData();
    formData.set("key", config.cdn.imgdb_key);
    formData.append("image", req.body.image);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload`,
        formData
      );
      res.status(200).json({
        success: true,
        data: response.data.data.url,
      });
    } catch (err) {
      console.error(err.response?.data || err);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);

export default router;
