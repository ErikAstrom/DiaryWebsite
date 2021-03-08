const User = require("../model/user");

require("dotenv").config();

const renderMyPage = async (req, res) => {

const populatedUser = await User
.findOne({_id: req.user.user._id})
.populate("likedEntries userEntries");



res.render("myPage.ejs", { user: populatedUser });

};

module.exports = { renderMyPage };
