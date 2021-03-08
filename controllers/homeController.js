const User = require("../model/user");
const Entry = require('../model/diaryEntry');
require("dotenv").config();
const renderHomePage = async (req,res)=>{

const sort = +req.query.sort || 1;
const page = +req.query.page || 1;


try {
    const totalEntries = await Entry.find().countDocuments({"public":true});

    const entriesPerPage = 4;
    const entryCalc = Math.ceil(totalEntries / entriesPerPage);
    const displayedEntries = entriesPerPage * page;
 
    const data = await Entry.find({"public":true}).limit(displayedEntries).sort({date:sort})
    res.render("homePage.ejs",
    {
        data,
        totalEntries,
        entriesPerPage,
        entryCalc,
        displayedEntries,
        errors:"empty",
        user:req.user.user
    })
}
catch(err){
    res.redirect("/")
}

}

//likeEntry moved to entryController
    
const logOut = (req,res)=> {
    console.log("cleared cookies");
    res.clearCookie("jwtToken").redirect("/")

}

module.exports = {
    renderHomePage,
    logOut
}