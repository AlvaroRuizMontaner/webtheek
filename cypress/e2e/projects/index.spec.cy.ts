import '../../support/commands';
import { email, frontendUrl, password } from "../../support/credentials";

describe('Login and access projects', () => {

    it('Visit projects', () => {
        cy.login(email, password);

        // Visita los projects
        cy.visit(`${frontendUrl}/projects`)
        cy.contains(/proyectos/i).should('exist'); // Verifica que se carga correctamente
    });
    it('Visit test project', () => {
        cy.login(email, password);

        // Visita los proyectos
        cy.visit(`${frontendUrl}/projects/678920ab9e30380d3d1fecdd`)
    });
});