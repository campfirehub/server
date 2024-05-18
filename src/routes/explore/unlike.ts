import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import Interactions from "../../models/interactions.js";
import Project from "../../models/project.js";
import Notification from "../../models/Notification.js";
const router = express.Router();

router.post(
  "/unlike/:id",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    if (
      !(await Interactions.exists({
        project: req.params.id,
        author: req.user.id,
        type: "like",
      }))
    ) {
      return res.status(403).json({
        success: false,
        error: "Not liked yet",
      });
    }
    const projectData = await Project.findById(req.params.id);
    if (!projectData) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    await Interactions.findOneAndDelete({
      type: "like",
      project: req.params.id,
      author: req.user.id,
    });
    projectData.likes--;
    await projectData.save();
    res.status(200).json({
      success: true,
    });
    Notification.deleteOne({
      type: "like",
      from: req.user.id,
      to: projectData.owner,
      data: { project: projectData.id },
    }).catch((err) => {});
  }
);

export default router;
