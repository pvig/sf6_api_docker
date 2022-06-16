// https://docs.cypress.io/api/table-of-contents

describe("Signup test", () => {
  it("Visits signup page", () => {
    cy.visit("/signup");
    cy.contains("Inscription");
  });
});
