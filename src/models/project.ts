import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

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
          value != "slideshow" &&
          value != "iframe" &&
          value != "blocks" &&
          value != "code"
        )
          ok = false;
        return ok;
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
  likes: {
    type: Number,
    default: 0,
  },
});

interface ProjectInterface {
  name: String;
  description: String;
  type: String;
  data: { [key: string]: any };
  engine: String;
  createdAt: Date;
  lastUpdate: Date;
  owner: {
    _id: String;
    id: String;
    username: String;
  };
  forked: Boolean;
  forkedFrom: Object;
  public: Boolean;
  publishedData: { [key: string]: any };
  thumbnail: String;
  likes: number;
}

interface ProjectDocument extends mongoose.Document, ProjectInterface {}

schema.plugin(paginate);

export default mongoose.model<
  ProjectDocument,
  mongoose.PaginateModel<ProjectDocument>
>("projects", schema);
