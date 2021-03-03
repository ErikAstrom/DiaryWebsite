const User = require("../model/user");

const renderHomePage = (req,res)=>{

res.render("homePage.ejs", {user:req.user.user})

}


module.exports = {
    renderHomePage
}