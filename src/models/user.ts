import mongoose from "mongoose";

function isLowerCase(input) {
  return input === String(input).toLowerCase();
}

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        var ok = true;
        if (!isLowerCase(value)) ok = false;
        if (String(value).includes(" ")) ok = false;
        return ok;
      },
      message: (props) => "'" + props.value + "' is not a valid username",
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  disabled: {
    type: Boolean,
    required: true,
    default: () => false,
  },
});

export default mongoose.model("user", schema);
