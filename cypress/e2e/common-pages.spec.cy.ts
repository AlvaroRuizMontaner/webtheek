/* import { expect } from 'chai'; */

describe('visit common pages', () => {
  it('visit home', () => {
    cy.visit(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000/")
  })
  it('visit explora projects', () => {
    cy.visit(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000/explora-proyectos")
  })
  it('visit explora quizzes', () => {
    cy.visit(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000/explora-quizzes")
  })

})