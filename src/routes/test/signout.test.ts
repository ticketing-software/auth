import request from "supertest";
import { app } from "../../app";

it("To Test the signout and see whether cookie is deleted", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "thisisthetest@testingsite.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "thisisthetest@testingsite.com",
      password: "password",
    })
    .expect(200);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
});
