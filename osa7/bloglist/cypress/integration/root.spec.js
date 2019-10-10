describe("Frontpage", function () {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const testUser = {
      username: "pekka",
      password: "koodi",
      name: "Naapurin Pekka"
    }
    cy.request("POST", "http://localhost:3003/api/users", testUser)
      .then(response => {
        expect(response.body).to.have.property("username", "pekka")
      });
    cy.visit("http://localhost:3000");
  });

  it("Frontpage loads with login form", function(){ 
    cy.contains("Login");
    cy.get("form");
  });
  
  it("can toggle signup form", function() {
    cy.contains("Signup").click();
    cy.contains("Username");
    cy.get("#signupSubmitButton").should("be.visible");
  });

  it("cancel toggles signup form off", function() {
    cy.contains("Signup").click();
    cy.get("#signupSubmitButton").should("be.visible");
    cy.contains("Cancel").click();
    cy.get("#signupSubmitButton").should('not.be.visible');
  });

  it("can signup", function() {
    cy.contains("Signup").click();
    cy.get("#signUpUsername")
      .type("testiukko");
    cy.get("#signUpPassword")
      .type("testi");
    cy.get("#signUpName")
      .type("Testi Ukko");
    cy.get("#signupSubmitButton")
      .click();
    cy.contains("created");    
  });

  it("can signin", function() {
    cy.get("input[name='username']:first")
      .type("pekka");
    cy.get("#loginPassword")
      .type("koodi");
    cy.get("#loginSubmit")
      .click();
    cy.contains("Naapurin Pekka");
  });

})