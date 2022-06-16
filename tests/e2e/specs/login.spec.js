// https://docs.cypress.io/api/table-of-contents

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("Connection");
    cy.get('#login').type( Cypress.env('login') );
    cy.get('#password').type( Cypress.env('password') );
    cy.get('form').submit();
    cy.get('.title', { timeout: 10000 }).contains("Test app");

  })
});
