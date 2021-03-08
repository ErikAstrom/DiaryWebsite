const User = require("../model/user");
const Entry = require("../model/diaryEntry");
require("dotenv").config();

const likeEntry = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id });
  const entryId = req.params.id;

  try {
    user.addToLike(entryId);
    const userWithEntryId = await User.findOne({
      _id: req.user.user._id,
    }).populate("likedEntries");
    userWithEntryId.save();
  } catch (err) {
    if (err) return res.render("register.ejs", { err: err });
  }
  res.redirect("/");
};

const removeEntry = async (req, res) => {
  const entryId = req.params.id;
  await Entry.deleteOne({ _id: entryId });
  res.redirect("/myPage");
};
const unLikeEntry = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id });
  const entryId = req.params.id;



  for (let i = 0; i < user.likedEntries.length; i++) {
    if (entryId == user.likedEntries[i]._id) {
      user.likedEntries.splice(i, 1);
      user.save();
    }
  }
  res.redirect("/myPage");
};

module.exports = { likeEntry, removeEntry, unLikeEntry };
