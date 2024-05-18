import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import Interactions from "../../models/interactions.js";
import Project from "../../models/project.js";
import notif from "../../helpers/notif.js";
const router = express.Router();

router.post(
  "/like/:id",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    if (
      await Interactions.exists({
        project: req.params.id,
        author: req.user.id,
        type: "like",
      })
    ) {
      return res.status(403).json({
        success: false,
        error: "Already liked",
      });
    }
    const projectData = await Project.findById(req.params.id).populate("owner");
    if (!projectData) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    const interaction = new Interactions({
      author: req.user.id,
      project: req.params.id,
      type: "like",
    });
    await interaction.save();
    projectData.likes++;
    await projectData.save();

    //@ts-ignore
    notif.sendNotification("like", req.user.id, projectData.owner, {
      project: projectData.id,
    });
    res.status(200).json({
      success: true,
    });
  }
);

export default router;
