import { body } from "express-validator";

export const userInputValidator = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email").isEmail().withMessage("Email must be valid"),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),

  body("address").notEmpty().withMessage("Address must be filled"),

  body("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be exactly 10 digits long")
    .isNumeric()
    .withMessage("Phone number must only contain digits"),
];

export const loginInputValidator = [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email must be valid"),
  
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ];  