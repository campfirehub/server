import express from "express";
import checkAuth from "../../authChecker.js";
import Project from "../../models/project.js";
import mongoose from "mongoose";
import config from "../../config.js";
import generateEmbed from "../../helpers/generateEmbed.js";
const router = express.Router();

router.get(
  "/embed/:id",
  async (req: express.Request, res: express.Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }
    const projectData = await Project.findById(req.params.id);
    if (projectData == null)
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });

    if (!projectData.public) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }
    res.status(200).send(generateEmbed.genKaboomEmbed(projectData.data.code));
  }
);

export default router;
