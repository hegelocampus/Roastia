describe('Splash test', () => {
  beforeEach(() => {
    cy.visit('/');
  });


  it('logging in via form submission logs user in and does not redirect', () => {
    const email = 'example@example.com';
    const password = 'example';

    cy.contains('Log in').click();

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(`${password}{enter}`);

    cy.url().should('include', '/');

    //TODO: Implement this check in a way that works
    //cy.getCookie('auth-token').should('exist');
    cy.contains('Log Out');
  });
});

