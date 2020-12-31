import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";

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
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate Json Web Token
    const userjwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "asdf"
    );

    // Storing on the web object
    request.session = {
      jwt: userjwt,
    };

    response.status(201).send(user);

    //   Make a new user
  }
);

export { router as signUp };
