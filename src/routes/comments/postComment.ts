import express from "express";
import Project from "../../models/project.js";
import Comment from "../../models/comment.js";
import checkAuth from "../../helpers/authChecker.js";
import config from "../../config.js";
import mongoose from "mongoose";
const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

router.post(
  "/comments/:id",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    if (!req.body.content) {
      return res.status(422).json({
        success: false,
        error: "Missing body parameters",
      });
    }
    if (
      !mongoose.Types.ObjectId.isValid(req.params.id) ||
      !(await Project.exists({ _id: req.params.id }))
    ) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }
    if (
      req.body.content.length > config.projects.comments.maxLength ||
      req.body.content.length < 1
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Comment length must be between 1 and " +
          config.projects.comments.maxLength,
      });
    }
    let isReply = false;
    let replyComment;
    if (!req.body.replyTo || req.body.replyTo == "") req.body.replyTo = "";
    else {
      if (!mongoose.Types.ObjectId.isValid(req.body.replyTo)) {
        return res.status(400).json({
          success: false,
          error: "Invalid reply comment id",
        });
      }
      isReply = true;
      replyComment = await Comment.findById(req.body.replyTo);

      if (replyComment == null) {
        res.status(404).json({
          success: false,
          error: "Reply comment not found",
        });
        return;
      }
    }
    try {
      let userReply = req.body.userReply;
      await Comment.create({
        author: req.user.id,
        content: req.body.content,
        projectId: req.params.id,
        replyTo: req.body.replyTo,
        isReply: isReply,
        userReply: userReply,
      });
      if (isReply) {
        replyComment.replies = replyComment.replies + 1;
        await replyComment.save();
      }
      res.status(201).json({
        success: true,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);

export default router;
