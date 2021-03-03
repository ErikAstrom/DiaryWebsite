const User = require("../model/user");
const bcrypt = require("bcrypt");

const renderRegister = (req, res) => {
  res.render("register.ejs", { err: "" });
};

const submitRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  let role = req.body.role;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    }).save();
  } catch (err) {
    if (err) return res.render("register.ejs", { err: err });
  }
  return res.redirect("/login");
};

module.exports = {
  renderRegister,
  submitRegistration,
};
