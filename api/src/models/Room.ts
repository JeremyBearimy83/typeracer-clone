import mongoose from "mongoose";
import shortid from "shortid";

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#@"
);

// This library needs 64 chars so the 2 specials at the end are necessary :/

const playerSchema = new mongoose.Schema({
  // this is the socket id
  _id: {
    type: String,
    required: true,
  },
  isPartyLeader: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  color: {
    type: String,
    validate: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
    required: true,
  },
  currentWordIndex: {
    type: Number,
    default: 0,
  },
  finalPosition: {
    type: Number,
    default: -1,
  },
  WPM: {
    type: Number,
    default: -1,
  },
});

const roomSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
    paragraph: {
      type: String,
      required: true,
    },
    players: {
      type: [playerSchema],
      default: [],
    },
    gameStarted: {
      type: Boolean,
      default: false,
    },
  }
  // { versionKey: false }
);

export default mongoose.model<any>("Room", roomSchema);
