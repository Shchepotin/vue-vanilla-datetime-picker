// https://docs.cypress.io/api/introduction/api.html

describe('DateTimePicker flow', () => {
  it('Picker without props', () => {
    cy.visit('/');
  });

  it('Check empty value', () => {
    cy.contains('#picker-no-props', 'Choose date');
  });

  it('Check toggle picker', () => {
    cy.get('#picker-no-props > .datetime-picker__button').click();
    cy.get('#picker-no-props > .datetime-picker-main').should('be.visible');
    cy.get('#picker-no-props > .datetime-picker__button').click();

    cy.get('#picker-no-props > .datetime-picker__button').click();
    cy.get('#picker-no-props > .datetime-picker-main').should('be.visible');
    cy.get('body').click();
  });

  it('Check time open picker', () => {
    cy.get('#picker-no-props > .datetime-picker__button').click();
    cy.get('#picker-no-props .time-picker__button').click();
  });

  it('Check time picker hours slider', () => {
    cy.get('#picker-no-props .datetime-picker-main .time-picker .text-slider')
      .eq(0)
      .children('.text-slider__value')
      .contains('00');

    cy.get('#picker-no-props .datetime-picker-main .time-picker .text-slider')
      .eq(0)
      .children('.text-slider__button-previous')
      .click()
      .click()
      .click()
      .click()
      .click();

    cy.get('#picker-no-props .datetime-picker-main .time-picker .text-slider')
      .eq(0)
      .children('.text-slider__value')
      .contains('05');
  });

  it('Check time picker minutes slider', () => {
    cy.get('#picker-no-props .datetime-picker-main .time-picker .text-slider')
      .eq(1)
      .children('.text-slider__value')
      .contains('00');

    cy.get('#picker-no-props .datetime-picker-main .time-picker .text-slider')
      .eq(1)
      .children('.text-slider__button-previous')
      .click()
      .click()
      .click()
      .click()
      .click();

    cy.get('#picker-no-props .datetime-picker-main .time-picker .text-slider')
      .eq(1)
      .children('.text-slider__value')
      .contains('05');
  });

  it('Check time close picker', () => {
    cy.get('body').click();
  });
});
