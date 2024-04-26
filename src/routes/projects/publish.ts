import express from "express";
import checkAuth from "../../authChecker.js";
import Project from "../../models/project.js";
const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

/* 

      async function getProjectWithOwner(projectId) {
        const project = await Project.findById(projectId).populate("owner");
        return project;
      }
*/

router.post(
  "/publish/:id",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    try {
      const projectData = (await Project.findById(req.params.id)).populated(
        "owner"
      );
      if (projectData.owner.id != req.user.id) {
        res.status(403).json({
          success: false,
          error: "You have no access to the project",
        });
        return;
      }
    } catch (err) {
      res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }
  }
);

export default router;
