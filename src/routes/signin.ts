import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must apply a password"),
  ],
  //   Validation Middleware
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const existingUser = await User.findOne({ email });

    // Checking if the user exists
    if (!existingUser) {
      throw new BadRequestError("Invalid Login Credentials");
    }

    // Checking if the password is matched
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid Login Credentials");
    }

    // When the password is authenticated

    const userjwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      "asdf"
    );

    // Storing on the web object
    request.session = {
      jwt: userjwt,
    };

    response.status(200).send(existingUser);
  }
);

export { router as signIn };
