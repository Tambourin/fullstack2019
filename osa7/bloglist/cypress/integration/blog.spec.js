describe("Blogs", function () {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const testUser = {
      username: "pekka",
      password: "koodi",
      name: "Naapurin Pekka"
    }
    cy.request("POST", "http://localhost:3003/api/users", testUser);
    
    cy.visit("http://localhost:3000");
    
    cy.get("input[name='username']:first")
      .type("pekka");
    cy.get("#loginPassword")
      .type("koodi");
    cy.get("#loginSubmit")
      .click();    
  });  

  it("can add a blog", function() {
    cy.contains("Add new")
      .click();
    cy.get("input[name='title']")
      .type("testiblogi");
    cy.get("input[name='author']")
      .type("testauthor");
    cy.get("input[name='url']")
      .type("testurl");
    cy.get("button[type='submit']")
      .click();
    cy.contains('"testiblogi" created');
    cy.get("a").contains("testiblogi")
      .click();
    cy.get("h2").contains("testiblogi")
    cy.contains("Likes")
    cy.get("button").contains("like").click();
    cy.contains("Likes: 1");
    cy.get("input[type='text']")
      .type("olipa kerran...");
    cy.get("button").contains("Send")
      .click();
    cy.get("p");
  });
});