import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import Project from "../../models/project.js";
import mongoose from "mongoose";
import config from "../../config.js";
import jwt from "jsonwebtoken";
import Interactions from "../../models/interactions.js";
const router = express.Router();

router.get("/view/:id", async (req: express.Request, res: express.Response) => {
  req.user = {};
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, config.auth.jwt_secret, (err, user) => {
    if (err) req.user = {};
    req.user = user;
  });
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

  let hasLiked = req.user
    ? await Interactions.exists({
        type: "like",
        author: req.user.id,
        project: projectData._id,
      })
    : false;
  if (!req.user) req.user = {};
  if (!req.user.id) req.user.id = "";
  if (!projectData.public && projectData.owner.id != req.user.id) {
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
      public: projectData.public,
      likes: projectData.likes,
      liked: hasLiked,
    },
  });
});

export default router;
