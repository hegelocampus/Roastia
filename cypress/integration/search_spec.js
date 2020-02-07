describe('Search Spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Renders search bar which accepts input', () => {
    cy.get('.react-autosuggest__input')
      .type('Seattle')
      .should('have.value', 'Seattle');
  });

  it('Search bar renders coffees', () => {
    cy.get('.react-autosuggest__input')
      .type('Seattle')
      .should('have.value', 'Seattle');
  });
});
