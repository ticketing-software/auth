import mongoose from "mongoose";
import "dotenv/config";
import { app } from "./app";

let PORT = 3000 || process.env.PORT;

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_CONNECTION_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
};

start();
