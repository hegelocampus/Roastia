describe('Splash test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Renders the splash message', () => {
    cy.contains("Discover a coffee shop where you'll love to code");
  });

  it('Renders a link to the login form', () => {
    cy.contains('Log in').click();

    cy.url().should('include', '/login');
  });

  it('Renders a link to the add shop modal which redirects to the login modal', () => {
    cy.contains('Add').click();

    cy.contains('Add Shop').click();

    cy.url().should('include', '/login');
  });
});

