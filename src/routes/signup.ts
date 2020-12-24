import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 30 })
      .withMessage("Password must be between 4 to 30"),
  ],
  (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      //   return response.status(400).send(errors.array());
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = request.body;

    console.log("Creating a user....");

    response.send({});

    //   Make a new user
  }
);

export { router as signUp };
