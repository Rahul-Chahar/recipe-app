const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, adminCode } = req.body;
    
    
    console.log("Received adminCode:", adminCode, "Expected:", process.env.ADMIN_CODE);

   
    let role = "user";
    if (adminCode && adminCode.trim() === process.env.ADMIN_CODE) {
      role = "admin";
    }
    
   
    const user = await User.create({ username, email, password, firstName, lastName, role });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.status === "banned") {
      return res.status(403).json({ message: "Your account has been banned." });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

