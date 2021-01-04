import request from "supertest";
import { app } from "../../app";

it("Returns a 201 on a sign-up", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("Returns a 400 on a sign-up", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "fjsadasdf",
      password: "password",
    })
    .expect(400);
});

it("Returns a 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "fjsadasdf",
      password: "p",
    })
    .expect(400);
});

it("Returns a 400 on not sending email or password or both", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ password: "dfnsadnf" })
    .expect(400);

  await request(app).post("/api/users/signup").send({}).expect(400);
});

it("Disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "passwrod",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "passwrod",
    })
    .expect(400);
});

it("Sets up a cookie after successful sign-up", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "passwrod",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
