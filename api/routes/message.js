const router = require("express").Router();
const Message = require("../models/Message");

router.post("/addMessage", async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.send("Message created");
  } catch (err) {
    res.send(err);
  }
});

router.get("/messages", async (req, res) => {
  const messages = await Message.find({
    from_user: req.body.fromUser,
    to_user: req.body.toUser,
  });
  res.send(messages);
});

module.exports = router;
