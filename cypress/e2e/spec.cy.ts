describe("Pokemon Page Tests", () => {
  it("Toggle Dark/Light mode", () => {
    cy.visit("http://localhost:3000/");
    cy.get('button[data-cy="toggle-colormode-button"]').click();
    cy.get('[data-cy="SunIcon"], [data-cy="MoonIcon"]').should("exist");
  });

  it("List contains visible cards", () => {
    cy.visit("http://localhost:3000/");
    cy.get('div[data-cy="pokemon-card-1"]').should("exist");
    cy.get('img[data-cy="pokemon-card-img-1"]').should("be.visible");
  });

  it("Open modal", () => {
    cy.visit("http://localhost:3000/");
    cy.get('div[data-cy="pokemon-card-1"]').should("exist");
    cy.get('div[data-cy="pokemon-card-1"]').should("be.visible");
    cy.get('div[data-cy="pokemon-card-1"]').click();
  });
});
