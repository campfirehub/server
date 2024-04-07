import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        var ok = true;
        if (
          value != "quiz" ||
          value != "iframe" ||
          value != "blocks" ||
          value != "code"
        )
          ok = false;
      },
      message: (props) => "'" + props.value + "' is not a valid type",
    },
  },
  data: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

export default mongoose.model("projects", schema);
