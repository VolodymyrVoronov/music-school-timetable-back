import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    const existingUser = await User.findOne({ login });

    if (!existingUser) {
      return res.status(404).json({ message: `User doens't exist.` });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: `Invalid credentials.` });
    }

    const token = jwt.sign({ login: existingUser.login, id: existingUser._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong.` });
    console.log(error);
  }
};

export const registration = async (req, res) => {
  const { firstName, secondName, login, password, password2 } = req.body;

  try {
    const existingUser = await User.findOne({ login });

    if (existingUser) {
      return res.status(400).json({ message: `User already exists.` });
    }

    if (password !== password2) {
      return res.status(400).json({ message: `Passwords don't match.` });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      firstName,
      secondName,
      login,
      password: hashedPassword,
    });

    const token = jwt.sign({ login: result.login, id: result._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong.` });
    console.log(error);
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
