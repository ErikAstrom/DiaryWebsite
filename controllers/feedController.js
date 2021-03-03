const Entry = require('../model/diaryEntry');
const User = require("../model/user");

const getEntries = async (req,res)=>{

const sort = +req.query.sort || 1;
const page = +req.query.page || 1;

try {
    const totalEntries = await Entry.find().countDocuments();
    const entriesPerPage = 4;
    const entryCalc = Math.ceil(totalEntries / entriesPerPage);
    const displayedEntries = entriesPerPage * page;

    const data = await Entry.find().limit(displayedEntries).sort({date:sort})

    res.render("feed.ejs",
    {
        data,
        totalEntries,
        entriesPerPage,
        entryCalc,
        displayedEntries,
        errors:"empty"
    })
}
catch(err){
    res.redirect("/", {error:err})
}

}


const likeEntry = async (req,res)=> {

const user = await User.findOne({ _id: req.user.user._id });
const entryId = req.params.id;
try {
user.addToLike(entryId);
const userWithEntryId = await User.findOne({ _id: req.user.user._id }).populate("likedEntries");
userWithEntryId.save();
}
catch (err) {
    if (err) return res.render("register.ejs", { err: err });
  }
res.redirect("/feed");

}

module.exports = {
    getEntries,
    likeEntry
}