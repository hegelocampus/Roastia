//import { login } from '../../server/services/auth';

const email = 'example@example.com';
const password = 'example';

describe('Login form spec', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true)
    cy.visit('/');
    cy.clearCookies()
  });

  it('sets auth cookie when logging in via form submission', () => {
    cy.contains('Log in').click();

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(`${password}{enter}`);

    //cy.getCookie('token').should('exist');
    cy.contains('Log Out');
  });


});

/*
describe('User logged in spec', () => {
  before(() => {
    let user;
    cy.wrap(login({ email, password })).then(newUser => user = newUser);
  });

  beforeEach(() => {
    cy.visit('/');
    cy.wrap( ).should('be.an', 'object');
  });

  it('Can add shop after logging in', () => {
    cy.contains('Add').click();

    cy.contains('Add Shop').click();
    cy.contains('Add New Coffee Shop');
  });

  it('Can add coffee after logging in', () => {
    cy.contains('Add').click();

    cy.contains('Add Shop').click();
    cy.contains('Add New Coffee Shop');
  });
});
*/

