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
        cy.visit(`${frontendUrl}/quizzes/67ab3e82b0366ba1e7daedb9`)
    });
});

describe('E2E Mutation Tests', () => {
  
    it('Create a resource', () => {
      cy.login(email, password); // Login al inicio

      // Interceptar la solicitud antes del envío del formulario
      cy.intercept('POST', '/api/quizzes').as('createQuiz');

      // Crear un recurso
      cy.visit(`${frontendUrl}/quizzes/create`);

      cy.get('#quizName').focus().type(resourceName);
      cy.get('#description').focus().type(resourceName);
      cy.get('form').submit() // Submit a form

      // Esperar a que la solicitud interceptada se complete
      //cy.wait('@createQuiz').its('response.statusCode').should('eq', 200);
      cy.wait('@createQuiz').then((interception) => {
        cy.log('POST URL:', interception.request.url);
        cy.log('Response status:', (interception.response as any).statusCode);
        cy.log('Request body:', JSON.stringify(interception.request.body));
        cy.log('Response body:', JSON.stringify((interception.response as any).body));
      });
    });

    it('Buscar si el quiz se ha creado, editarlo y luego borrarlo', () => {
        cy.login(email, password); // Login al inicio

        // Interceptar la solicitud GET de quizzes
        cy.intercept('GET', '/api/quizzes').as('getQuizzes');
        
        cy.visit(`${frontendUrl}/quizzes`);

        cy.wait('@getQuizzes', { timeout: 15000 }).then((interception) => {
            cy.log('GET URL:', interception.request.url);
            cy.log('Response status:', (interception.response as any).statusCode);
            cy.log('Response body:', JSON.stringify((interception.response as any).body));
        });
        
        // Encuentra el elemento que contiene el nombre del recurso y extrae su ID
        cy.contains(resourceName, { timeout: 15000 }).should('exist').invoke('attr', 'id').then((resourceId) => {
            //const resourceId = element.attr('id'); // Supón que el ID está en un atributo `data-id`
            cy.log(`Resource ID: ${resourceId}`); // Muestra el ID en los logs para depuración 
            
            // Guarda el ID en el localStorage
            //cy.window().then((win) => {
            //    win.localStorage.setItem('resourceId', resourceId ?? "testId");
            //});

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