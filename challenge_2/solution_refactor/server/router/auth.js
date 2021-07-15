import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";

const router = express.Router();

const validateAuth = {
  username: body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("username should be at least 3 characters"),
  password: body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password should be at least 8 characters"),
  name: body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("name should be at least 8 characters"),
  email: body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("invalid email format"),
  url: body("url").trim(),
};

const makeValidate = (...args) => {
  return [...args.map((arg) => validateAuth[arg] || null), validate];
};

router.post(
  "/signup",
  makeValidate("username", "password", "name", "email", "url"),
  authController.signUp
);

router.post(
  "/login",
  makeValidate("username", "password"),
  authController.login
);

export default router;
