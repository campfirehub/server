import express from "express";
import checkAuth from "../../authChecker.js";
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

router.post(
  "/project/create",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
    });
  }
);

export default router;
