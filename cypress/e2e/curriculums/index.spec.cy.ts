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

        cy.request({
            method: 'POST',
            url: 'https://webtheek-server.onrender.com/api/auth/login',
            body: { email, password },
        }).then((response) => {
            const token = response.body;
            cy.task("log", `status: ${response.status}`)
            
            // Guardar el token en el localStorage antes de visitar la página
            cy.visit(`http://localhost:3000/curriculums`, {
                onBeforeLoad(win) {
                    win.localStorage.setItem('AUTH_TOKEN', token); // O sessionStorage.setItem()
                }
            }).then((AUTWindow) => {
                // 📌 Logs para inspeccionar el `AUTWindow`
                cy.task("log", `Window Location Before: ${AUTWindow.location.href}`);
                cy.task("log", `Document Ready State: ${AUTWindow.document.readyState}`);
                cy.task("log", `Document Referrer: ${AUTWindow.document.referrer}`);
                cy.task("log", `Window History Length: ${AUTWindow.history.length}`);
            });
              

            // Esperar a que se haga la solicitud de curriculums y registrar los detalles
            cy.wait('@getCurriculums', { timeout: 15000 }).then((interception) => {
                cy.task("log", `GET Request URL: ${interception.request.url}`);
                cy.task("log", `Response Status: ${interception.response?.statusCode}`);
                cy.task("log", `Response Body: ${JSON.stringify(interception.response?.body)}`);
            });

            cy.contains(resourceName, { timeout: 15000 }).should('exist')
        });

        //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODZlNGUwOTczYmVhYmE0YjNmNmEyOSIsImlhdCI6MTcyNTQ0NjM4OCwiZXhwIjoxNzQwOTk4Mzg4fQ.ukVkuOzGQYObl39zIOxzJgnXq1H8u8x04x10NHWIdbk"

/*         cy.request({
            url: 'https://webtheek-server.onrender.com/api/curriculums',
            followRedirect: false, // Para ver si devuelve un 301
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            cy.task("log", `Status Code: ${response.status}`);
            cy.task("log", `Response Headers: ${JSON.stringify(response.headers)}`);
            cy.task("log", `Response Body: ${JSON.stringify(response.body)}`);
            if (response.status === 301 || response.status === 302) {
              cy.task("log", `Redirect Location: ${response.headers.location}`);
            }
        }); */


/*         cy.wait('@getCurriculums', { timeout: 15000 }).then((interception) => {
            cy.task("logStringify", JSON.stringify(interception.request.url))
            cy.task("logStringify", JSON.stringify(interception.request.headers))
            cy.task('log', JSON.stringify((interception.response as any).body));
            cy.task('log', (interception.response as any).statusCode);
            cy.task('log', (interception.response as any).message);

            if((interception.response as any).statusCode === 301) {
                const redirectUrl = interception.response?.headers['location'] as string;
                cy.visit(redirectUrl)
            }
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