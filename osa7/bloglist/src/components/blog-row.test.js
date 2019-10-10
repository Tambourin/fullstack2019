import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import BlogRow from "./blog-row";

afterEach(cleanup);

describe("BlogRow component", () => {
  let component;

  const testBlog = {
    title: "Testi-blogi",
    author: "Testi Authori",
    url: "/hashahs.fi/ksks",
    likes: 0
  };

  const blogs = [testBlog];

  const setBlogs = () => { return null };

  const user = {};

  beforeEach(() => {
    component = render(
      <BlogRow blog={testBlog} blogs={blogs} setBlogs={setBlogs} user={user} />
    );
  });

  test("BlogRow shows blog title", () => {
    expect(component.container).toHaveTextContent("Testi-blogi");
  });

  test("BlogRow does not show likes before it has been clicked", () => {
    expect(component.container).not.toHaveTextContent("likes");
  });

  test("Likes are shown after row has been clicked", () => {
    const div = component.container.querySelector("div");
    fireEvent.click(div);
    expect(component.container).toHaveTextContent("Likes");
  });

  test("clicking row again hides extra information", () => {
    const div = component.container.querySelector("div");
    fireEvent.click(div);
    fireEvent.click(div);
    expect(component.container).not.toHaveTextContent("likes");
  })
});
