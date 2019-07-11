const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

const testUser = {
  username: "olli",
  password: "koodi",
  name: "Olavi Hartonen"
};

beforeEach(async () => {  
  await User.deleteMany({});
  let promises = [];
  promises = promises.concat(api.post("/api/users").send(testUser));
  await Promise.all(promises);
});

test("login returns token", async () => {
  const response = await api.post("/api/login").send({ username: "olli", password: "koodi" });
  expect(response.body).toHaveProperty("token");
});

test("login with with wrong password returns error", async () => {
  const response = await api.post("/api/login").send({ username: "olli", password: "kokokok" });
  expect(response.body).toHaveProperty("error");
});

afterAll(() => {
  mongoose.connection.close();
});
