Cypress.Commands.add('login', (email, password) => {
    cy.request({
      method: 'POST',
      url: `http://localhost:4000/api/auth/login`,
      body: { email, password },
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica que el login fue exitoso
      const token = response.body;
      cy.window().then((window) => {
        window.localStorage.setItem('AUTH_TOKEN', token); // Guarda el token
      });
    });
  });