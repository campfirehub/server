import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const schema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        var ok = true;
        if (
          value != "like" &&
          value != "comment" &&
          value != "reply" &&
          value != "follow"
        )
          ok = false;
        return ok;
      },
      message: (props) => "'" + props.value + "' is not a valid type",
    },
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  data: {
    project: String,
    comment: String,
  },
});

interface NotificationInterface {
  type: String;
  author: Object;
  to: Object;
  createdAt: Date;
  seen: Boolean;
  data: {
    project: String;
    comment: String;
  };
}

interface NotificationDoc extends mongoose.Document, NotificationInterface {}

schema.plugin(paginate);

export default mongoose.model<
  NotificationDoc,
  mongoose.PaginateModel<NotificationDoc>
>("notifications", schema);
