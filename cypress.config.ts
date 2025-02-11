import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on/* , config */) {
        on('task', {
            log(message) {
              console.log(message); // Esto imprime el mensaje en la terminal
              return null; // Cypress requiere un valor de retorno
            }
        })
    },
    //baseUrl: process.env.NEXT_PUBLIC_FRONTEND_URL, // Cambia la URL según tu proyecto
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Archivos de pruebas permitidos
    supportFile: false, // Desactiva el archivo de soporte
  }
});
