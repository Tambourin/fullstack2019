import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import SimpleBlog from "./simple-blog";

afterEach(cleanup);



describe("<SimpleBlog />", () => {
  let component;

  const testBlog = {
    title: "testi title",
    author: "Testi Authori",
    likes: 5
  }

  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={testBlog} onClick={mockHandler}/>
    );
  });  

  test("Rendered component has title and author", () => {
    expect(component.container).toHaveTextContent("testi title");
    expect(component.container).toHaveTextContent("Testi Authori");
    
  });

  test("Rendered component shows right number of likes", () => {
    const likeDiv = component.container.querySelector(".likes");
    expect(likeDiv).toHaveTextContent("5");
  });

  test("Clicking a button is registered", () => {
    const button = component.container.querySelector("button");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls.length).toBe((2));
  });

});
