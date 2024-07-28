const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      ...req.body,
      //username: req.body.username,
      //email: req.body.email,
      password: hashedPassword,
    });
    //save user and respond
    const user = await newUser.save();
    res
      .status(200)
      .json({ user: user, message: "kullanıcı başarıyla oluşturuldu" });
  } catch (err) {
    res.status(500).json(err.message, "Kayıt olurken hata oluştu");
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    {
      !user && res.status(404).json("wrong password");
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err, "Giriş yaparken hata oluştu");
  }
});
module.exports = router;
