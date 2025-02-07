Cypress.Commands.add('login', (email, password) => {
    cy.request({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      body: { email, password },
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica que el login fue exitoso
      const token = response.body;
      cy.window().then((window) => {
        window.localStorage.setItem('AUTH_TOKEN', token); // Guarda el token
      });
    });
  });