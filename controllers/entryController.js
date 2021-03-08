const Entry = require("../model/diaryEntry");

const User = require("../model/user");

require("dotenv").config();

const renderEntryPage = async (req, res) => {
  res.render("writeEntry.ejs", {user:req.user.user});
};

const postEntry = async (req, res) => {
  const { header, body, radio } = req.body;

  
try {
  const entry = await new Entry({
    entryHeader: header,
    entryBody: body,
    public: radio,
    date: Date.now()
  }).save();
 
  let entryId = entry.id;
  const user = await User.findOne({ _id: req.user.user._id });
  user.userLibrary(entryId);
  user.populate("userEntries");
}
catch (err) {
  console.log(err);
    if (err) return res.render("writeEntry.ejs", { err: err });
  }
  
  res.redirect("/");
};



module.exports = { renderEntryPage, postEntry };
