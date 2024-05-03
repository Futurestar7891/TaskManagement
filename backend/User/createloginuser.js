const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenexpiretime = "1d";
const router = express.Router();
const userschema = require("../Schema/userschema");

router.post(
  "/signup",
  [
    body("Email", "Please provide a valid email").isEmail(),
    body("Name", "Name should be at least 4 characters long").isLength({
      min: 4,
    }),
    body("Mobile", "Please provide a valid mobile number")
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
    body("Password", "Password should be at least 8 characters long").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const { Name, Email, Mobile, Password } = req.body;
      const errors = validationResult(req);
      if (!Name || !Email || !Mobile || !Password) {
        return res.status(401).json({
          message: "Please fill all details",
        });
      } else if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      const userExist = await userschema.findOne({ Email: Email });
      if (userExist) {
        return res.status(401).json({
          success: false,
          message: "User already registered",
        });
      }

      const hashedPassword = await bcrypt.hash(Password, 10);
      await userschema.create({
        Name,
        Email,
        Mobile,
        Password: hashedPassword,
      });
      res.status(200).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  [
    body("Email", "Please provide a valid email").isEmail(),
    body("Password", "Password should be at least 8 characters long").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const { Email, Password } = req.body;
      const errors = validationResult(req);
      if (!Email || !Password) {
        return res.status(401).json({
          success: false,
          message: "please fill all fields",
        });
      } else if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
      }

      const userExist = await userschema.findOne({ Email: Email });
      if (!userExist) {
        return res.status(400).json({
          success: false,
          message: "User not found, please register first",
        });
      }

      const matchPassword = await bcrypt.compare(Password, userExist.Password);
      if (!matchPassword) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }

      const token = jwt.sign(
        { id: userExist._id },
        process.env.JWTSECRET || "your_secret_key_here",
        {
          expiresIn: tokenexpiretime,
        }
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        Token: token,
        Name: userExist.Name,
        Email: userExist.Email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
