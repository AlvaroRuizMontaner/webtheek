import '../../support/commands';
import { email, frontendUrl, password } from "../../support/credentials";

const resourceName = "Test";
const editResourceName = "Edited";

beforeEach(() => {
  cy.login(email, password)
})

Cypress.on("uncaught:exception", (err) => {
    // Cypress and React Hydrating the document don't get along
    // for some unknown reason. Hopefully, we figure out why eventually
    // so we can remove this.
    if (
      /hydrat/i.test(err.message) ||
      /Minified React error #418/.test(err.message) ||
      /Minified React error #423/.test(err.message)
    ) {
      return false;
    }
});

describe('Login and access projects', () => {
    it('Visit projects', () => {
        // Visita los projects
        cy.visit(`${frontendUrl}/projects`)
        cy.contains(/proyectos/i).should('exist'); // Verifica que se carga correctamente
    });
    it('Visit test project', () => {
        // Visita los proyectos
        cy.visit(`${frontendUrl}/projects/67ab3e60b0366ba1e7daed9b`)
    });
});

describe('E2E Mutation Tests', () => {
  
    it('Create a resource', () => {
      // Interceptar la solicitud antes del envío del formulario
      cy.intercept('POST', '/api/projects').as('createProject');

      // Crear un recurso
      cy.visit(`${frontendUrl}/projects/create`);

      //cy.get('#projectName').type('Nombre del Proyecto', { force: true });
      cy.get('#projectName').focus().type(resourceName);
      cy.get('#clientName').focus().type(resourceName);
      cy.get('#description').focus().type(resourceName);

      cy.get('form').submit() // Submit a form

      // Esperar a que la solicitud interceptada se complete
      //cy.wait('@createProject').its('response.statusCode').should('eq', 200);
      cy.wait('@createProject').then((interception) => {
        cy.task('log:', `status: ${interception.response}`);
      });
    });

    it('Buscar si el proyecto se ha creado, editarlo y luego borrarlo', () => {
      // Interceptar la solicitud GET de projects
      cy.intercept('GET', '/api/projects').as('getProjects');
      
      cy.visit(`${frontendUrl}/projects`);

      cy.wait('@getProjects', { timeout: 15000 }).then((interception) => {
        cy.task('log', interception.request.url);
        cy.log('Response status:', (interception.response as any).statusCode);
        cy.log('Response body:', JSON.stringify((interception.response as any).body));

        // Encuentra el elemento que contiene el nombre del recurso y extrae su ID
        cy.contains(resourceName, { timeout: 15000 }).should("exist").invoke("attr", "id").then((resourceId) => {
          //const resourceId = element.attr('id'); // Supón que el ID está en un atributo `data-id`
          cy.log(`Resource ID: ${resourceId}`); // Muestra el ID en los logs para depuración

          // Guarda el ID en el localStorage
          //cy.window().then((win) => {
          //    win.localStorage.setItem('resourceId', resourceId ?? "testId");
          //});

          cy.visit(`${frontendUrl}/projects/${resourceId}/edit`);

          cy.get("#projectName").focus().clear().type(editResourceName);
          cy.get("#clientName").focus().clear().type(editResourceName);
          cy.get("#description").focus().clear().type(editResourceName);

          cy.get("form").submit(); // Submit a form

          cy.intercept("GET", "/api/projects").as("getProjectsEdited");

          // Buscar si el proyecto se ha editado
          cy.visit(`${frontendUrl}/projects`);

          // Esperar a que se haga la solicitud de proyectos y registrar los detalles
          cy.wait("@getProjectsEdited", { timeout: 15000 }).then((interception) => {
            cy.task("log", `GET Request URL: ${interception.request.url}`);
            cy.task("log",`Response Status: ${interception.response?.statusCode}`);
            cy.task("log",`Response Body: ${JSON.stringify(interception.response?.body)}`);

            cy.contains(editResourceName).should("exist");

            // Borrar el proyecto
            cy.visit(`${frontendUrl}/projects?deleteProject=${resourceId}`);
            cy.get("#password").focus().clear().type("password");

            cy.get("form").submit(); // Submit a form
          });
        });
      });  
  });
});