import express from "express";
import Project from "../../models/project.js";
import Comment from "../../models/comment.js";
import checkAuth from "../../helpers/authChecker.js";
import config from "../../config.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

router.delete(
  "/comments/:id",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.id) ||
      !(await Comment.exists({ _id: req.params.id }))
    ) {
      return res.status(404).json({
        success: false,
        error: "Comment not found",
      });
    }
    const comment = await Comment.findById(req.params.id).populate("author");
    const projectData = await Project.findById(comment.projectId).populate(
      "owner"
    );
    let canDelete = false;
    let replyingToComment; // Comment object if it's a reply
    if (comment.isReply) {
      replyingToComment = await Comment.findById(comment.replyTo);
    }
    //@ts-ignore
    if (comment.author.id == req.user.id) canDelete = true;
    else if (projectData.owner.id == req.user.id) canDelete = true;
    try {
      if (canDelete) {
        await Comment.deleteOne({ _id: req.params.id });
        if (comment.isReply) {
          replyingToComment.replies--;
          await replyingToComment.save();
        }
        if (!comment.isReply && comment.replies > 0) {
          await Comment.deleteMany({ replyTo: comment._id });
        }
        res.status(201).json({
          success: true,
        });
      } else {
        res.status(403).json({
          success: false,
          error: "You can't delete the comment",
        });
      }
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
