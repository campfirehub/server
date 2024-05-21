import express from "express";
import Project from "../../models/project.js";
import Comment from "../../models/comment.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";
const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

let options = {
  page: 1,
  limit: 10,
  collation: {
    locale: "en",
  },
  sort: [["createdAt", -1]],
  populate: {
    path: "author",
    select: "username avatarUrl",
  },
};

router.get(
  "/comments/:id",
  async (req: express.Request, res: express.Response) => {
    options.page = 1;
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, config.auth.jwt_secret, (err, user) => {
      if (err) req.user = {};
      req.user = user;
    });
    if (!req.user) req.user = {};
    if (!req.user.id) req.user.id = "";
    if (Number(req.query.page) && !isNaN(Number(req.query.page)))
      options.page = Number(req.query.page);
    Comment.paginate(
      { projectId: req.params.id, isReply: false },
      options,
      async function (err, result) {
        if (err) {
          return res.status(404).json({
            success: false,
            error: "Project not found",
          });
        }
        const projectData = await Project.findById(req.params.id).populate(
          "owner"
        );
        result.isProjectOwner = req.user.id == projectData.owner.id;
        res.status(200).json(result);
      }
    );
  }
);

export default router;
