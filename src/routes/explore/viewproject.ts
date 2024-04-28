import express from "express";
import checkAuth from "../../authChecker.js";
import Project from "../../models/project.js";
import mongoose from "mongoose";
import config from "../../config.js";
const router = express.Router();

router.get("/view/:id", async (req: express.Request, res: express.Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      success: false,
      error: "Project not found",
    });
  }
  const projectData = await Project.findById(req.params.id).populate(
    "owner",
    "username"
  );
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
  res.status(200).json({
    success: true,
    data: {
      name: projectData.name,
      description: projectData.description,
      type: projectData.type,
      engine: projectData.engine,
      createdAt: projectData.createdAt,
      lastUpdate: projectData.lastUpdate,
      owner: projectData.owner,
      forked: projectData.forked,
      forkedFrom: projectData.forkedFrom,
      embedUrl: `${config.server.host}/embed/${projectData._id}`,
    },
  });
});

export default router;
