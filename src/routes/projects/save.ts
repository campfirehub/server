import express from "express";
import checkAuth from "../../authChecker.js";
import Project from "../../models/project.js";
const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

router.post(
  "/project/:id",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    let projectData;
    // Only the data property in projects should be there!
    try {
      projectData = await Project.findById(req.params.id);
    } catch (err) {
      res.status(404).json({
        success: false,
        error: "Project not found",
      });
      return;
    }
    if (projectData.owner != req.user.id) {
      res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
      return;
    }
    projectData.data = req.body;
    projectData.lastUpdate = Date.now();
    await projectData.save();

    res.status(200).json({
      success: true,
    });
  }
);

export default router;
