/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => {  })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


declare global {
  namespace Cypress {
    // interface Chainable {
    //   login(email: string, password: string): Chainable<void>
    //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    // }
    interface Chainer<Subject> {
        (chainer: 'have.selection', type: string): Chainable<Subject>
    }
  }
}


// Add custom Chai assertion
chai.Assertion.addMethod('selection', function (expectedText: string) {
  const inputElement = this._obj[0] as HTMLInputElement;
  const selectedText = inputElement.value.substring(inputElement.selectionStart!, inputElement.selectionEnd!);
  this.assert(
    selectedText === expectedText,
    `Expected selected text to be #{exp} but got #{act}`,
    `Expected selected text to not be #{exp}`,
    expectedText, // Expected
    selectedText // Actual
  );
});


export {}