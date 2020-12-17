import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signUp } from "./routes/signup";
import { signIn } from "./routes/signin";
import { signOut } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not_found_error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signUp);
app.use(signIn);
app.use(signOut);

app.all("*", async () => {
  throw new NotFoundError();
});

// Middlewares
app.use(errorHandler);

let PORT = 3000 || process.env.PORT;

app.listen(3000, () => {
  console.log(`Listening on PORT ${PORT}`);
});
