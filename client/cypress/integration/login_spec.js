let user;

import { createTestClient  } from 'apollo-server-testing';
import { login } from '../../../server/services/auth';

import { LOGIN_USER } from '../../src/graphql/mutations';

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

    cy.getCookie('token').should('exist');
    cy.contains('Log Out');
  });


});

describe('User logged in spec', () => {
  before(() => {
    const server = new ApolloServer({});

    const { query, mutation } = createTestClient(server);
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

