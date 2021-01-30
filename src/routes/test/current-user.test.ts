import request from "supertest";
import { app } from "../../app";

it("Testing out the current user and cookie", async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "thisisthetest@testingsite.com",
      password: "sdljfnlksajdfk",
    })
    .expect(201);

  const cookie = authResponse.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual(
    "thisisthetest@testingsite.com"
  );
});

// it("Testing out the current user and cookie", async () => {
//   const response = await request(app)
//     .post("/api/users/signout")
//     .send({})
//     .expect(200);

//   expect(response.body.currentUser).toEqual(null);
// });
