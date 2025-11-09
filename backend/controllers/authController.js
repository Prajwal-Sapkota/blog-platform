// backend/controllers/authController.js
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.validPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Sign token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
};
