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
  completedSetup: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  avatar: {
    skinColor: {
      type: String,
      default: "edb98a",
    },
    eyes: {
      type: String,
      default: "default",
    },
    eyebrows: {
      type: String,
      default: "default",
    },
    mouth: {
      type: String,
      default: "default",
    },
    hairstyles: {
      type: String,
      default: "longhair",
    },
    haircolor: {
      type: String,
      default: "",
    },
    facialhair: {
      type: String,
      default: "none",
    },
    clothes: {
      type: String,
      default: "vneck",
    },
    fabriccolor: {
      type: String,
      default: "545454",
    },
    glasses: {
      type: String,
      default: "none",
    },
    glassopacity: {
      type: String,
      default: 0.5,
    },
    accesories: {
      type: String,
      default: "none",
    },
    tattoos: {
      type: String,
      default: "non", // No, it's not a typo
    },
    backgroundcolor: {
      type: String,
      default: "ffffff",
    },
  },
  avatarUrl: {
    type: String,
    default: "",
  },
});

export default mongoose.model("user", schema);
