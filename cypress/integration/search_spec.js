describe('Search Spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Renders search bar which accepts input', () => {
    cy.get('.react-autosuggest__input')
      .type('Seattle')
      .should('have.value', 'Seattle');
  });

  //FIXME: Need to tell cypress to similate hovering over element so this works
  //consistently
  it('Search bar renders coffee shops by city', () => {
    cy.get('.react-autosuggest__input')
      .type('Seattle')
    cy.contains('Slate Coffee');
  });

  //FIXME: Need to tell cypress to similate hovering over element so this works
  //consistently
  it('Search bar renders coffees by orgin', () => {
    cy.get('.react-autosuggest__input')
      .type('Guatemala');
    cy.contains('Gateway');
  });

  it('Search bar renders coffees by roast', () => {
    cy.get('.react-autosuggest__input')
      .type('Guatemala');
    cy.contains('Gateway');
  });
});
