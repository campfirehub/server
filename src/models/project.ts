import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
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
  engine: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  lastUpdate: {
    type: Date,
    default: () => Date.now(),
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  forked: {
    type: Boolean,
    default: false,
  },
  forkedFrom: {
    type: mongoose.Schema.ObjectId,
    ref: "projects",
  },
  public: {
    type: Boolean,
    default: false,
  },
  publishedData: {
    type: Object,
    required: false,
    default: {},
  },
  thumbnail: {
    type: String,
    default: "",
  },
});

export default mongoose.model("projects", schema);
