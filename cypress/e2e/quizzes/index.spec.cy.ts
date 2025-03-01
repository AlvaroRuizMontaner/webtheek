import '../../support/commands';
import { email, frontendUrl, password } from "../../support/credentials";

const resourceName = "Test";
const editResourceName = "Edited";

beforeEach(() => {
    cy.login(email, password)
})

describe('Login and access quizzes', () => {

    it('Visit quizzes', () => {
        // Visita los quizzes
        cy.visit(`${frontendUrl}/quizzes`)
        cy.contains(/quizzes/i).should('exist'); // Verifica que se carga correctamente
    });
    it('Visit test quiz', () => {
        // Visita los proyectos
        cy.visit(`${frontendUrl}/quizzes/67ab3e82b0366ba1e7daedb9`)
    });
});

describe('E2E Mutation Tests', () => {
  
    it('Create a resource', () => {
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
        // Interceptar la solicitud GET de quizzes
        cy.intercept('GET', '/api/quizzes').as('getQuizzes');
        
        cy.visit(`${frontendUrl}/quizzes`);

        cy.wait('@getQuizzes', { timeout: 15000 }).then((interception) => {
            cy.log('getQuizzes status:', (interception.response as any).statusCode);

            // Encuentra el elemento que contiene el nombre del recurso y extrae su ID
            cy.contains(resourceName, { timeout: 15000 }).should('exist').invoke('attr', 'id').then((resourceId) => {
                //const resourceId = element.attr('id'); // Supón que el ID está en un atributo `data-id`
                cy.log(`Resource ID: ${resourceId}`); // Muestra el ID en los logs para depuración 

                // Interceptar la solicitud de edición antes de hacerla
                cy.intercept('PUT', `/api/quizzes/*`).as('editQuiz');

                cy.visit(`${frontendUrl}/quizzes/${resourceId}/edit`)

                cy.get('#quizName').focus().clear().type(editResourceName);
                cy.get('#description').focus().clear().type(editResourceName);
            
                cy.get('#submit').click()

                // Esperar a que la API procese la edición antes de continuar
                cy.wait('@editQuiz', { timeout: 15000 }).then((interception) => {
                    cy.task("log", `editQuiz Status: ${interception.response?.statusCode}`);

                    cy.intercept("GET", "/api/quizzes").as("getQuizzesEdited");

                    // Buscar si el quiz se ha editado
                    cy.visit(`${frontendUrl}/quizzes`);
    
                    cy.wait("@getQuizzesEdited", { timeout: 15000 }).then((interception) => {
                        cy.task("log",`getQuizzesEdited Status: ${interception.response?.statusCode}`);
    
                        cy.contains(editResourceName).should("exist").invoke('attr', 'id').then(() => {
                            // Interceptar la solicitud DELETE antes de hacerla
                            cy.intercept('DELETE', `/api/quizzes/*`).as('deleteQuiz');
    
                            // Borrar el quiz
                            cy.visit(`${frontendUrl}/quizzes?deleteQuiz=${resourceId}`);
                            cy.get("#password").focus().clear().type("password");
    
                            cy.get('#submit').click()
    
                            cy.wait('@deleteQuiz', { timeout: 15000 }).then((interception) => {
                                cy.task("log", `deleteQuiz Status: ${interception.response?.statusCode}`);
                            });
                        })
                    });    
                });     
            });
        });
    });
});
                
    // Guarda el ID en el localStorage
    //cy.window().then((win) => {
    //    win.localStorage.setItem('resourceId', resourceId ?? "testId");
    //});