export {}

declare global {
    namespace Cypress {
      interface Chainable {

        //Custom command to select DOM element by data-cy attribute.
        login(email: string, password: string): Chainable<void>
      }
    }
}