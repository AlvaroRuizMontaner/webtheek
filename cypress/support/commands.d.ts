export {}

declare global {
    namespace Cypress {
      interface Chainable {

        //Custom command to select DOM element by data-cy attribute.
        login(email: string, password: string);
      }
    }
}

/* Servira para tipar login algun dia
// support/index.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): void;
  }
}
*/