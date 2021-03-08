require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Entry = require("../model/diaryEntry");

const renderAdmin = (req, res) => {
  res.render("admin.ejs", { user: req.user.user });
};
const clearEntries = async (req, res) => {
  await Entry.deleteMany();

  res.render("admin.ejs", { msg: "Entries cleared", user: req.user.user });
};

const deleteUser = async (req, res) => {
  const name = req.body.name;

  await User.deleteOne({ name: name });

  res.render("admin.ejs", {
    msg: "User deleted",
    user: req.user.user,
  });
};

module.exports = { clearEntries, deleteUser, renderAdmin };
