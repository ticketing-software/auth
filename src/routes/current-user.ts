import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/api/users/currentuser", (request: Request, response: Response) => {
  if (!request.session?.jwt) {
    return response.send({ currentUser: null });
  }

  //   Validating Json web token
  try {
    const payload = jwt.verify(request.session.jwt, "asdf");

    return response.send({ currentUser: payload });
  } catch (error) {
    return response.send({ user: null });
  }
});

export { router as currentUserRouter };
