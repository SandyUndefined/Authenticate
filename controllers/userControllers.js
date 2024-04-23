const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

exports.register = async (req, res) => {
  try {
    const { name, phoneNumber, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.users.create({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .send({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering new user", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await db.users.findOne({ where: { phoneNumber } });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: "Error logging in", error: error.message });
  }
};
