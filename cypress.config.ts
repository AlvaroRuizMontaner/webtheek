import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(/* on, config */) {
      // Configura eventos aquí si es necesario
    },
    //baseUrl: process.env.NEXT_PUBLIC_FRONTEND_URL, // Cambia la URL según tu proyecto
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Archivos de pruebas permitidos
    supportFile: false, // Desactiva el archivo de soporte
  },
});
