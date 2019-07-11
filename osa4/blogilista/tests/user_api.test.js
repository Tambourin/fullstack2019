const mongoose = require("mongoose");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const testUsers = [
  {
    username: "olli",
    password: "koodi",
    name: "Olavi Hartonen"
  },
  {
    username: "hilton",
    password: "erikoodi",
    name: "John Hilton"
  }
];

beforeEach(async () => {
  await User.deleteMany({});
  const promises = 
    testUsers
      .map(user => new User(user))
      .map(userObject => userObject.save());
  await Promise.all(promises);
});

describe("users database", () => {
  test('all users can be fetched from db', async () => {
    const result = await User.find({});
    expect(result.length).toEqual(testUsers.length);
  });

  
  
});

describe("user tests using http", () => {
  const testUser = {
    username: "testiUser",
    password: "testiPassword",
    name: "testiName"         
  }

  const testUserUsernameShort = {
    username: "te",
    password: "testiPassword",
    name: "testiName"
  }

  const testUserPasswordShort = {
    username: "testishotpass",
    password: "u",
    name: "testiName"
  }

  const testUserNoPassword = {
    username: "testiUserwithNoPassword",
    name: "testiName"
  }

  test('get all users', async () => {
    const response = await api.get("/api/users");
    const body = response.body;
    expect(body.length).toBe(testUsers.length);
  });

  test("User data in DB contains passwordHash", async () => {
    await api.post("/api/users").send(testUser);
    const result = await User.find({});
    expect(result[result.length - 1].passwordHash).toBeDefined();
  });

  test('user data does not contain passwordHash when using GET', async () => {
    await api.post("/api/users").send(testUser);
    const response = await api.get('/api/users');
    const body = response.body;
    expect(body[body.length - 1].passwordHash).not.toBeDefined();
  });

  test("post user", async () => {
    await api
      .post("/api/users")
      .send(testUser)
      .expect(200)
      .expect("Content-Type", /json/);
    
    const result = await User.find({});
    
    expect(result.length).toBe(testUsers.length + 1);
    const names = result.map(r => r.username);
    expect(names).toContain(testUser.username)
  });

  test("cannot save user with no password", async () => {
    await api
      .post("/api/users")
      .send(testUserNoPassword)
      .expect(400)
      .expect({ error: "password required" });
  });

  test("cannot save user with too short password", async () => {
    await api
      .post("/api/users")
      .send(testUserPasswordShort)
      .expect(400)
      .expect({ error: "password too short" });
  });

  test("cannot save user with too short username", async () => {
    const response = await api
      .post("/api/users")
      .send(testUserUsernameShort)
      .expect(400);
  });
  
});



afterAll(() => {
  mongoose.connection.close();
});
