import '../../support/commands';
import { email, frontendUrl, password } from "../../support/credentials";

const resourceName = "Test";
const editResourceName = "TestEdited";

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

describe('E2E Mutation Tests', () => {
  
    it('Create a resource', () => {
      cy.login(email, password); // Login al inicio

      // Crear un recurso
      cy.visit(`${frontendUrl}/projects/create`);

      //cy.get('#projectName').type('Nombre del Proyecto', { force: true });
      cy.get('#projectName').focus().type(resourceName);
      cy.get('#clientName').focus().type(resourceName);
      cy.get('#description').focus().type(resourceName);

      cy.get('form').submit() // Submit a form
    });

    it('Buscar si el proyecto se ha creado, editarlo y luego borrarlo', () => {
        cy.login(email, password); // Login al inicio
        
        cy.visit(`${frontendUrl}/projects`);
        
        // Encuentra el elemento que contiene el nombre del recurso y extrae su ID
        cy.contains(resourceName).should('exist').invoke('attr', 'id').then((resourceId) => {
          //const resourceId = element.attr('id'); // Supón que el ID está en un atributo `data-id`
          cy.log(`Resource ID: ${resourceId}`); // Muestra el ID en los logs para depuración 
          
          // Guarda el ID en el localStorage
          cy.window().then((win) => {
              win.localStorage.setItem('resourceId', resourceId ?? "testId");
          });

          cy.visit(`${frontendUrl}/projects/${resourceId}/edit`)

          cy.get('#projectName').focus().clear().type(editResourceName);
          cy.get('#clientName').focus().clear().type(editResourceName);
          cy.get('#description').focus().clear().type(editResourceName);
    
          cy.get('form').submit() // Submit a form

          // Buscar si el proyecto se ha editado
          cy.visit(`${frontendUrl}/projects`);
          cy.contains(editResourceName).should('exist');

          // Borrar el proyecto
          cy.visit(`${frontendUrl}/projects?deleteProject=${resourceId}`);
          cy.get('#password').focus().clear().type("password");

          cy.get('form').submit() // Submit a form
        });
    });
});