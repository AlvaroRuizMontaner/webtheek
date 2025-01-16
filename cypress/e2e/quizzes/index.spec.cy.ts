import '../../support/commands';
import { email, frontendUrl, password } from "../../support/credentials";

describe('Login and access quizzes', () => {

    it('Visit quizzes', () => {
        cy.login(email, password);

        // Visita los quizzes
        cy.visit(`${frontendUrl}/quizzes`)
        cy.contains(/quizzes/i).should('exist'); // Verifica que se carga correctamente
    });
    it('Visit test quiz', () => {
        cy.login(email, password);

        // Visita los proyectos
        cy.visit(`${frontendUrl}/quizzes/6789211a9e30380d3d1fecfa`)
    });
});