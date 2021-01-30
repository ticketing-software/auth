import request from "supertest";
import { app } from "../../app";

it("Gives out 400 when email or password is not supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      password: "password",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "thisisthetest@testingsite.com",
      password: "password",
    })
    .expect(400);

  await request(app).post("/api/users/signin").send({}).expect(400);
});

it("To test whether we are receiving the cookie on signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "thisisthetest@testingsite.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "thisisthetest@testingsite.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
