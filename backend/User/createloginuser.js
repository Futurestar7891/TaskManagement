const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const router = express.Router();
const userschema = require("../Schema/userschema");
const { createjwttoken } = require("../jwtauth");

const options = {
  expiresIn: new Date(Date.now() + process.env.COOKIEEXPIRE),
  httpOnly: true,
};

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

      try {
        const userExist = await userschema.findOne({ Email: Email });
        if (userExist) {
          return res.status(401).json({
            success: false,
            message: "User already registered",
          });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const userdata = await userschema.create({
          Name,
          Email,
          Mobile,
          Password: hashedPassword,
        });
        await userdata.save();
        const token = createjwttoken({ id: userdata._id });
        res.status(201).cookie("token", token, options).json({
          success: true,
          id: userdata._id,
          Token: token,
          message: "User registered successfully",
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
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
      console.log(Email, Password);
      const errors = validationResult(req);
      if (!Email || !Password) {
        return res.status(401).json({
          success: false,
          message: "please fill all fields",
        });
      } else if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
      }
      try {
        const userExist = await userschema.findOne({ Email: Email });
        if (!userExist) {
          return res.status(400).json({
            success: false,
            message: "User not found, please register first",
          });
        }

        const matchPassword = await bcrypt.compare(
          Password,
          userExist.Password
        );
        if (!matchPassword) {
          return res.status(401).json({
            success: false,
            message: "Incorrect password",
          });
        }
        const token = createjwttoken({ id: userExist._id });

        res.status(200).cookie("token", token, options).json({
          success: true,
          message: "Login successful",
          Token: token,
          Name: userExist.Name,
          Email: userExist.Email,
        });
      } catch (error) {
        console.log(error, "hai bhai");
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", null, {
      expiresIn: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "successfully logout",
    });
  } catch (error) {
    console.log("error");
  }
});

module.exports = router;
