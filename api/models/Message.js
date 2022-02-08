const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    from_user: { type: String, required: true },
    to_user: { type: String, required: true },
    room: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
