const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1 },
  password: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true },
  role: { type: String, default: "viewer" },
  token: String,
  tokenExpiration: Date,
  memberSince: { type: Date, default: Date.now() },
  likedEntries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diaryEntry",
    },
  ],
  userEntries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diaryEntry",
    },
  ],
});

userSchema.methods.userLibrary = function (entryId) {
  if (entryId !== undefined) {
    this.userEntries.push(entryId);
    this.save();
  }
};

userSchema.methods.addToLike = function (entryId) {
  for (let i = 0; i < this.likedEntries.length; i++) {
    if (entryId == this.likedEntries[i]._id) {
      console.log("Tried likeing same post");
      return;
    }
  }
  if (entryId !== undefined) {
    this.likedEntries.push(entryId);
    this.save();
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
