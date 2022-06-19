// https://docs.cypress.io/api/table-of-contents

describe("Login test", () => {
  it("Login to the app", () => {
    cy.visit("/");
    cy.contains("Connection");
    cy.get('#login').type( Cypress.env('login') );
    cy.get('#password').type( Cypress.env('password') );
    cy.get('form').submit();
    cy.get('#logo', { timeout: 10000 }).contains("Test app");

  })
});
