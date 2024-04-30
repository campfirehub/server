import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import Project from "../../models/project.js";
const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

router.post(
  "/unpublish/:id",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    try {
      const projectData = await Project.findById(req.params.id).populate(
        "owner"
      );
      if (projectData.owner.id != req.user.id) {
        res.status(403).json({
          success: false,
          error: "You have no access to the project",
        });
        return;
      }
      projectData.public = false;
      projectData.publishedData = null;
      await projectData.save();
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.error(err);
      res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }
  }
);

export default router;
