const express = require("express");
const verifyWriter = require("../middleware/verifyWriter");
const verifyUser = require("../middleware/verifyUser")
const { renderHomePage} = require("../controllers/homeController");
const router = express.Router();


router.get("/", verifyUser, renderHomePage);





router.get("/logout", (req, res)=>{
    

    res.clearCookie("jwtToken").redirect("/")
})


module.exports = router;