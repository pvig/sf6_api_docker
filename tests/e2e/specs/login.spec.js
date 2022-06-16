// https://docs.cypress.io/api/table-of-contents

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("Connection");
    cy.get('#login').type('pvi');
    cy.get('#password').type('pvi');
    cy.get('form').submit()
    cy.contains("Test app");

  })
});
