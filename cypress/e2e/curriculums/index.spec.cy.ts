import '../../support/commands';
import { email, frontendUrl, password } from "../../support/credentials";

const resourceName = "Test";
//const editResourceName = "Edited";

beforeEach(() => {
    cy.login(email, password)
})

describe('Login and access curriculums', () => {

    it('Visit curriculums', () => {
        // Visita los curriculums
        cy.visit(`${frontendUrl}/curriculums`)
        cy.contains(/Curriculums/i).should('exist'); // Verifica que se carga correctamente
    });
    it('Visit test curriculum', () => {
        // Visita los proyectos
        cy.visit(`${frontendUrl}/curriculums/67ab3e2db0366ba1e7daed55`)
    });
});

describe('E2E Mutation Tests', () => {
  
    it('Create a resource', () => {
        // Interceptar la solicitud antes del envío del formulario
        cy.intercept('POST', '/api/curriculums').as('createCurriculum');
  
        // Crear un recurso
        cy.visit(`${frontendUrl}/curriculums/create`);
  
        cy.get('#curriculumName').focus().type(resourceName);
        cy.get('form').submit() // Submit a form
  
        // Esperar a que la solicitud interceptada se complete
        //cy.wait('@createCurriculum').its('response.statusCode').should('eq', 200);
        cy.wait('@createCurriculum').then((interception) => {
            cy.task('log', interception.request.url);
            cy.log('Response status:', (interception.response as any).statusCode);
            cy.log('Request body:', JSON.stringify(interception.request.body));
            cy.log('Response body:', JSON.stringify((interception.response as any).body));
        });
      });

    it('Buscar si el curriculum se ha creado, editarlo y luego borrarlo', () => {
        // Interceptar la solicitud GET de curriculums
        cy.intercept('GET', '/api/curriculums').as('getCurriculums');
        
        cy.visit(`${frontendUrl}/curriculums`).then((algo) => {
            cy.task("log", `${frontendUrl}/curriculums`)
            cy.task("log", algo.location.href)
            cy.task("log", Boolean(algo.localStorage.getItem("AUTH_TOKEN")))
        })


/*         cy.wait('@getCurriculums', { timeout: 15000 }).then((interception) => {
            cy.task("logStringify", JSON.stringify(interception.request.url))
            cy.task("logStringify", JSON.stringify(interception.request.headers))
            cy.task('log', JSON.stringify((interception.response as any).body));
            cy.task('log', (interception.response as any).statusCode);

            const redirectUrl = interception.response?.headers['location'] as string;
            cy.visit(redirectUrl)
        }); */

        
        // Encuentra el elemento que contiene el nombre del recurso y extrae su ID
/*         cy.contains(resourceName, { timeout: 15000 }).should('exist').invoke('attr', 'id').then((resourceId) => {
          //const resourceId = element.attr('id'); // Supón que el ID está en un atributo `data-id`
          cy.log(`Resource ID: ${resourceId}`); // Muestra el ID en los logs para depuración 
          
          // Guarda el ID en el localStorage
          //cy.window().then((win) => {
          //    win.localStorage.setItem('resourceId', resourceId ?? "testId");
          //});

          cy.visit(`${frontendUrl}/curriculums/${resourceId}/edit`)

          cy.get('#curriculumName').focus().clear().type(editResourceName);
    
          cy.get('form').submit() // Submit a form

          // Buscar si el curriculum se ha editado
          cy.visit(`${frontendUrl}/curriculums`);
          cy.contains(editResourceName).should('exist');

          // Borrar el curriculum
          cy.visit(`${frontendUrl}/curriculums?deleteCurriculum=${resourceId}`);
          cy.get('#password').focus().clear().type("password");

          cy.get('form').submit() // Submit a form
        }); */
    });
});