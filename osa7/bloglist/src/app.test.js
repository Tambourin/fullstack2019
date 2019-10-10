import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, waitForElement } from "@testing-library/react";
jest.mock('./services/blogs');
import App from "./App";


const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    //originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
}) 

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

afterEach(cleanup);

describe("App-component", () => {
  let component;
  
  const user = {
    username: 'tester',
    token: '1231231214',
    name: 'Donald Tester'
  }

  beforeEach(() => {
    component = render(
      <App />
    );
  });
  

  test("Signup is rendered before being logged", () => {
    expect(component.container).toHaveTextContent("Signup");
  });

  test("No blogs are rendered before being logged in", () => {
    const blogRow = component.container.querySelectorAll(".blog-row");
    expect(blogRow.length).toBe(0);
  });

  test("No signup shown if logged in", () => {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    component.rerender(<App />);
    //await waitForElement(() => component.container.querySelector("p"));
    //component.debug();
    expect(component.container).not.toHaveTextContent("Signup");
  });



  test("list of blogs are shown when logged in", () => {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    component.rerender(<App />);
    //console.log(App.user);
  // await waitForElement(() => component.container.querySelector("p"));
    component.debug();
    const blogRows = component.container.querySelectorAll(".blog-row");
    expect(blogRows.length).toBe(2);
  });

});