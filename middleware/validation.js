import { body } from "express-validator";

const applicationValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
  ];
};

export { applicationValidationRules };
