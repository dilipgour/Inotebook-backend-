const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "general",
  },
date:{
  type:Date,
  default:Date.now
}
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;