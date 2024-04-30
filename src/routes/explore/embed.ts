import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import Project from "../../models/project.js";
import mongoose from "mongoose";
import config from "../../config.js";
import generateEmbed from "../../helpers/generateEmbed.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get(
  "/embed/:id/:token?",
  async (req: express.Request, res: express.Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }
    req.user = {};
    const token = req.params.token;
    jwt.verify(token, config.auth.jwt_secret, (err, user) => {
      if (err) req.user = {};
      req.user = user;
    });
    const projectData = await Project.findById(req.params.id);

    if (projectData == null)
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });

    if (!req.user?.id) {
      req.user = {};
      req.user.id = "";
    }

    if (!projectData.public && projectData.owner != req.user.id) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }
    res.status(200).send(generateEmbed.genKaboomEmbed(projectData.data.code));
  }
);

export default router;
