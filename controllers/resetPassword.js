const User = require("../model/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const resetRender = (req, res) => {
  res.render("reset.ejs", { err: "" });
};

const resetSubmit = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email: email });
 

  if (!user) return res.redirect("/login");

  const token = await crypto.randomBytes(32).toString("hex");

  user.token = token;
  user.tokenExpiration = Date.now() + 3600000;
  await user.save();

  const msg = await {
    to: user.email, 
    from: "eckedevelopments@gmail.com", 
    subject: "Daytell reset password link",
    text: "Instructions for creating a new password",
    html: `<h2> Click  <a href="http://localhost:8003/reset/${user.token}"> <b>here</b></a> to create a new password </h2>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent to" + user.email);
    })
    .catch((error) => {
      console.error(error);
    });

  res.render("login.ejs", { msg: "Kolla din email och följ instruktionerna" });
};
const resetParams = async (req, res) => {
  // req.params

  const token = req.params.token;

  try {
    const user = await User.findOne({
      token: token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user) return res.send("no work");

    res.render("resetForm.ejs", { err: "", email: user.email });
  } catch (err) {
    res.render("reset.ejs", { err: " Försök igen" });
  }
};

const resetFormSubmit = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  //vilken användare ska ha den nya lösenordet
  const user = await User.findOne({ email: email });

  user.password = hashedPassword;
  await user.save();
  res.redirect("/login");

  // verifera om mejl adressen finns
  //
};

module.exports = {
  resetRender,
  resetSubmit,
  resetParams,
  resetFormSubmit,
};
