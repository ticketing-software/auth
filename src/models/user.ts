import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes a properties that required to create a new user
interface UserAttr {
  email: string;
  password: string;
}

// An interface to describe the properties that user model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttr): UserDoc;
}

// An interfacce tat describe the properties that single User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  //   createdAt: string;
  //   updatedAt: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// A middleware for mongodb when user saves the password. Now I'm hashing the password before saving it to the database
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attr: UserAttr) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// const buildUser = (attr: UserAttr) => {
//   return new User(attr);
// };

export { User };
