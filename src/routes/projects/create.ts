import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import Project from "../../models/project.js";
const router = express.Router();

/* 
Path: "/project/create"
Method: POST
Body: {
  name: "",
  description: "",
  type: "",
  data: {}
}
*/

// Create a file e.g., custom.d.ts
declare module "express-serve-static-core" {
  interface Request {
    user: any; // Define the type of 'user' property here
  }
}

/* 

      async function getProjectWithOwner(projectId) {
        const project = await Project.findById(projectId).populate("owner");
        return project;
      }
*/

router.post(
  "/project/create",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    try {
      let toCreate = req.body;
      toCreate.owner = req.user.id;
      if (await Project.exists({ name: req.body.name, owner: req.user.id })) {
        return res.status(409).json({
          success: false,
          error: "Project already exists",
        });
      }
      const projectData = await Project.create(req.body);
      res.status(200).json({
        success: true,
        data: {
          id: projectData.id,
        },
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        error: err,
      });
    }
  }
);

export default router;
