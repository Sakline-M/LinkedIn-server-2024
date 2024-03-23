import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

//register controller
export const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email) {
      return res.send({ message: "Email is require" });
    }
    if (!password) {
      return res.send({ message: "Paswoord is required" });
    }

    //check user
    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Alreday Register please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModels({
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Registation",
      error,
    });
  }
};

//  login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Insert Email & password",
      });
    }

    // check email
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not Registered",
      });
    }

    // cHeck password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    //   token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.status(200).send({
      success: true,
      message: "Login Succcessfull",
      user: {
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Registation",
      error,
    });
  }
};
