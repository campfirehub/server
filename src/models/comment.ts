import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import config from "../config.js";

const schema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  content: {
    type: String,
    validate: {
      validator: (value) => {
        var ok = true;
        if (
          value.length > config.projects.comments.maxLength ||
          value.length < 1 ||
          typeof value != "string"
        )
          ok = false;
        return ok;
      },
      message: (props) =>
        "Max comment length is " + config.projects.comments.maxLength,
    },
  },
  isReply: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  replyTo: String,
  replies: {
    type: Number,
    required: true,
    default: () => 0,
  },
  projectId: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

interface CommentInterface {
  author: Object;
  content: String;
  isReply: Boolean;
  replyTo: String;
  projectId: String;
  createdAt: Date;
}

schema.plugin(paginate);

interface CommentDocument extends mongoose.Document, CommentInterface {}

export default mongoose.model<
  CommentDocument,
  mongoose.PaginateModel<CommentDocument>
>("comments", schema);
