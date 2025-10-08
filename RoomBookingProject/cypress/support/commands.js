// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('elementIsInView', { prevSubject: true }, (subject) => {
  return cy.window().then(win => {
    const rect = subject[0].getBoundingClientRect();
    expect(rect.top).to.be.within(0, win.innerHeight);
    expect(rect.right).to.be.within(0, win.innerWidth);
    expect(rect.bottom).to.be.within(0, win.innerHeight);
    expect(rect.left).to.be.within(0, win.innerWidth);
    return subject;
  });
});
