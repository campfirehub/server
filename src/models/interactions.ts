import mongoose from "mongoose";

const schema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        var ok = true;
        if (value != "like" && value != "fork") ok = false;
        return ok;
      },
      message: (props) => "'" + props.value + "' is not a valid type",
    },
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "projects",
  },
});

export default mongoose.model("interactions", schema);
