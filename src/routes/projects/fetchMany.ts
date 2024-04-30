import express from "express";
import checkAuth from "../../helpers/authChecker.js";
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

router.get(
  "/projects",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    // TODO: Add pagination
    const projects = await Project.find(
      { owner: req.user.id },
      "name createdAt lastUpdate forked public thumbnail description type engine"
    ).sort([["lastUpdate", -1]]);
    res.status(200).json({
      success: true,
      data: projects,
    });
  }
);

export default router;
