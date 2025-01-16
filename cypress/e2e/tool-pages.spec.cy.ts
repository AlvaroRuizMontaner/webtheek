import '../support/commands';

const email = 'zoezil_ifra@hotmail.com';
const password = 'password';
const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

describe('Login and access projects', () => {
    it('Visit projects', () => {
        cy.login(email, password);

        // Visita los proyectos
        cy.visit(`${frontendUrl}/projects`)
        cy.contains(/Proyectos/i).should('exist'); // Verifica que se carga correctamente
    });
    it('Visit test project', () => {
        cy.login(email, password);

        // Visita los proyectos
        cy.visit(`${frontendUrl}/projects/678920ab9e30380d3d1fecdd`)
    });
});
describe('Login and access quizzes', () => {
    it('Visit quizzes', () => {
        cy.login(email, password);

        // Visita los quizzes
        cy.visit(`${frontendUrl}/quizzes`)
        cy.contains(/Quizzes/i).should('exist'); // Verifica que se carga correctamente
    });
    it('Visit test quiz', () => {
        cy.login(email, password);

        // Visita los proyectos
        cy.visit(`${frontendUrl}/quizzes/6789211a9e30380d3d1fecfa`)
    });
});
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
