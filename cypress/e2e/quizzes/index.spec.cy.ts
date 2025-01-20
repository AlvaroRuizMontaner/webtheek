import '../../support/commands';
import { email, frontendUrl, password } from "../../support/credentials";

const resourceName = "Test";
const editResourceName = "TestEdited";

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

describe('E2E Mutation Tests', () => {
  
    it('Create a resource', () => {
      cy.login(email, password); // Login al inicio

      // Crear un recurso
      cy.visit(`${frontendUrl}/quizzes/create`);

      cy.get('#quizName').focus().type(resourceName);
      cy.get('#description').focus().type(resourceName);
      cy.get('form').submit() // Submit a form
    });

    it('Buscar si el quiz se ha creado, editarlo y luego borrarlo', () => {
        cy.login(email, password); // Login al inicio
        
        cy.visit(`${frontendUrl}/quizzes`);
        
        // Encuentra el elemento que contiene el nombre del recurso y extrae su ID
        cy.contains(resourceName).should('exist').invoke('attr', 'id').then((resourceId) => {
            //const resourceId = element.attr('id'); // Supón que el ID está en un atributo `data-id`
            cy.log(`Resource ID: ${resourceId}`); // Muestra el ID en los logs para depuración 
            
            // Guarda el ID en el localStorage
            cy.window().then((win) => {
                win.localStorage.setItem('resourceId', resourceId ?? "testId");
            });

            cy.visit(`${frontendUrl}/quizzes/${resourceId}/edit`)

            cy.get('#quizName').focus().clear().type(editResourceName);
            cy.get('#description').focus().type(resourceName);
        
            cy.get('form').submit() // Submit a form

            // Buscar si el quiz se ha editado
            cy.visit(`${frontendUrl}/quizzes`);
            cy.contains(editResourceName).should('exist');

            // Borrar el quiz
            cy.visit(`${frontendUrl}/quizzes?deleteQuiz=${resourceId}`);
            cy.get('#password').focus().clear().type("password");

            cy.get('form').submit() // Submit a form
            
        });
    });
});