import '../../support/commands';
import { email, frontendUrl, password } from "../../support/credentials";

const resourceName = "Test";
const editResourceName = "TestEdited";

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

describe('E2E Mutation Tests', () => {
  
    it('Create a resource', () => {
      cy.login(email, password); // Login al inicio

      // Interceptar la solicitud antes del envío del formulario
      cy.intercept('POST', '/api/curriculums').as('createCurriculum');

      // Crear un recurso
      cy.visit(`${frontendUrl}/curriculums/create`);

      cy.get('#curriculumName').focus().type(resourceName).then(($input) => {
        // $input es el elemento DOM resultante del comando cy.get()
        cy.log('El valor del input es:', $input.val()); // Imprime el valor actual del input
    });
      cy.get('form').submit() // Submit a form

      // Esperar a que la solicitud interceptada se complete
      cy.wait('@createCurriculum').its('response.statusCode').should('eq', 200);
    });

    it('Buscar si el curriculum se ha creado, editarlo y luego borrarlo', () => {
        cy.login(email, password); // Login al inicio
        
        cy.visit(`${frontendUrl}/curriculums`);
        
        // Encuentra el elemento que contiene el nombre del recurso y extrae su ID
        cy.contains(resourceName, { timeout: 10000 }).should('exist').invoke('attr', 'id').then((resourceId) => {
          //const resourceId = element.attr('id'); // Supón que el ID está en un atributo `data-id`
          cy.log(`Resource ID: ${resourceId}`); // Muestra el ID en los logs para depuración 
          
          // Guarda el ID en el localStorage
          cy.window().then((win) => {
              win.localStorage.setItem('resourceId', resourceId ?? "testId");
          });

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
        });
    });
});