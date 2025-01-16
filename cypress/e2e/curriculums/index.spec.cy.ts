import '../../support/commands';
import { email, frontendUrl, password } from "../../support/credentials";

describe('Login and access curriculums', () => {

    it('Visit curriculums', () => {
        cy.login(email, password);

        // Visita los curriculums
        cy.visit(`${frontendUrl}/curriculums`)
        cy.contains(/Curriculums/i).should('exist'); // Verifica que se carga correctamente
    });
    it('Visit test curriculum', () => {
        cy.login(email, password);

        // Visita los proyectos
        cy.visit(`${frontendUrl}/curriculums/678921419e30380d3d1fed2c`)
    });
});