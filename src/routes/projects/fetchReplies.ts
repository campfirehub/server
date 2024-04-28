import express from "express";
import Project from "../../models/project.js";
import Comment from "../../models/comment.js";
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
    model: "user",
  },
};

router.get(
  "/replies/:id/:commentId",
  async (req: express.Request, res: express.Response) => {
    options.page = 1;
    if (Number(req.query.page) && !isNaN(Number(req.query.page)))
      options.page = Number(req.query.page);
    Comment.paginate(
      {
        projectId: req.params.id,
        isReply: true,
        replyTo: req.params.commentId,
      },
      options,
      function (err, result) {
        if (err) {
          return res.status(404).json({
            success: false,
            error: "Comment not found",
          });
        }
        res.status(200).json(result);
      }
    );
  }
);

export default router;
