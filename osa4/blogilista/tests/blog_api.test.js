const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

let userToken = "";

const listOfBlogs = [
  {
    title: "freecodecamp",
    author: "Srebalaji Thirumalai",
    url:
      "https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/",
    likes: 2
  },
  {
    title: "Vivachiabatta",
    author: "Aleksi",
    url: "http://vivaciabatta.blogspot.com/",
    likes: 7
  },
  {
    title: "Hammers and high heels",
    author: "Carla",
    url: "http://hammersandhighheels.blogspot.com",
    likes: 3
  }
];

const testUser = {
  username: "olli",
  password: "koodi",
  name: "Olavi Hartonen"
};

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const postedUser = await api.post("/api/users").send(testUser);
  const response = await api
    .post("/api/login")
    .send({ username: testUser.username, password: testUser.password });
  userToken = response.body.token;
  //console.log("Token: ", userToken);
  const promises = listOfBlogs
    .map(blog => new Blog(blog))
    .map(blogObject => blogObject.save());
  await Promise.all(promises);
});

describe("blog api get tests", () => {
  test("JSON is returned", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /json/);
  });

  test("Response has right length", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(listOfBlogs.length);
  });

  test("Response contains right title", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map(blog => blog.title);
    expect(titles).toContain("Hammers and high heels");
  });

  test("Response has id-field", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("get single blog", async () => {
    const response = await api.get("/api/blogs/");
    const id = response.body[0]._id;
    const singleBlog = await api.get(`/api/blogs/${id}`);
    expect(singleBlog.body.id).toBeDefined();
  });
});

describe("Blog api post tests", () => {
  const testBlog = {
    title: "this is title",
    author: "Jouko",
    url: "https://www.",
    likes: 2
  };

  const testBlogNoLikes = {
    title: "testBlog with no Likes",
    author: "Jouko",
    url: "https://www."
  };

  const testBlogNoTitle = {
    author: "Jouko",
    url: "https://www."
  };

  const testBlogNoUrl = {
    title: "TestBlog with no url",
    author: "Jouko"
  };

  test("Posting a blog increases the number of blogs", async () => {
    await api.post("/api/blogs").send(testBlog);
    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(listOfBlogs.length + 1);
  });

  test("Posted blog is found", async () => {
    await api.post("/api/blogs").send(testBlog);
    const response = await api.get("/api/blogs");
    const titles = response.body.map(blog => blog.title);
    expect(titles).toContain("this is title");
  });

  test("posted blog with no likes gets likes 0", async () => {
    const response = await api.post("/api/blogs").send(testBlogNoLikes);
    const blogResponse = await api.get(`/api/blogs/${response.body._id}`);
    console.log(blogResponse.body);
    expect(blogResponse.body.likes).toBe(0);
  });

  test("posted blog should have a title and url, else error", async () => {
    await api
      .post("/api/blogs")
      .send(testBlogNoTitle)
      .expect(400);
    await api
      .post("/api/blogs")
      .send(testBlogNoUrl)
      .expect(400);
  });

  test("posted blog has user", async () => {
    const response = await api.post("/api/blogs").send(testBlog);
    const body = response.body;
    const blogs = await api.get("/api/blogs");
    expect(response.body.user).toBeDefined();
  });

  test("posted blogs shows in user.blogs", async () => {
    const response = await api
      .post("/api/blogs")
      .set({ authorization: `bearer ${userToken}` })
      .send(testBlog);
    const blog = response.body;
    const user = await User.findOne({ username: testUser.username });
    const array = user.blogs.map(blogID => blogID.toString());
    expect(array).toContainEqual(blog.id);
  });

  test("Posted blog has right user", async () => {
    const response = await api
      .post("/api/blogs")
      .set({ authorization: `bearer ${userToken}` })
      .send(testBlog);
    const user = await User.findOne({ username: testUser.username });
    const body = response.body;
    expect(body.user).toBe(user.id);
  });
});


describe("Delete blog", () => {
  test("delete has been accepted", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    await api.delete(`/api/blogs/${blogs[0].id}`).expect(200);
  });

  test("blog has been deleted", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    console.log(blogs[0].id);
    await api.delete(`/api/blogs/${blogs[0].id}`);
    const allAfterDelete = await api.get("/api/blogs");
    expect(allAfterDelete.body.length).toBe(response.body.length - 1);
  });

  test("right blog has been deleted", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    const deletedResponse = await api.delete(`/api/blogs/${blogs[0]._id}`);
    const deletedBlog = deletedResponse.body;
    expect(deletedBlog).toEqual(blogs[0]);
  });
});

describe("Update blog", () => {
  test("update blog number of likes", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    const blogWithMoreLikes = { ...blogs[0], likes: blogs[0].likes + 1 };
    await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(blogWithMoreLikes)
      .expect(200);
    const resposeAfterUpdate = await api.get(`/api/blogs/${blogs[0].id}`);
    expect(resposeAfterUpdate.body.likes).toBe(blogs[0].likes + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
