const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyAdmin = (req,res,next)=>{

const token = req.cookies.jwtToken;

if(!token) return res.render("login.ejs", {err:"Log in to continue"})

const validUser = jwt.verify(token, process.env.SECRET_KEY);

if(validUser.user.role !== "admin") return res.redirect("/");

req.user = validUser;
next();


}

module.exports = verifyAdmin;