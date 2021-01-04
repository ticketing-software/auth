import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signUp } from "./routes/signup";
import { signIn } from "./routes/signin";
import { signOut } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not_found_error";
import "dotenv/config";

const app = express();
app.set("trust-proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUserRouter);
app.use(signUp);
app.use(signIn);
app.use(signOut);

app.all("*", async () => {
  throw new NotFoundError();
});

// Middlewares
app.use(errorHandler);

export { app };
