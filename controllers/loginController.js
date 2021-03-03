const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const renderLogin = (req, res) => {
  res.render("login.ejs");
};


const userLogin = async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name: name });

  if (!user) return res.redirect("/register");

  const validUser = await bcrypt.compare(password, user.password);

  if (!validUser) return res.redirect("/login");

  const jwtToken = await jwt.sign({ user: user }, process.env.SECRET_KEY);

  if (jwtToken) {
    const cookie = req.cookies.jwtToken;

    if (!cookie) {
      res.cookie("jwtToken", jwtToken, { maxAge: 360000000, httpOnly: true });
    }

    res.redirect("/");
  }
};


module.exports = {
  userLogin,
  renderLogin,
};
