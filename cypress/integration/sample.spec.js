describe('My First Test', function () {
  it('User can log in', function () {
    cy.visit('http://localhost:3000/login')
    cy.get('#login_username').as('username')
    cy.get('#login_password').as('password')
    cy.get('button[type="submit"]').as('loginButton')
    cy.get('@username').type('m')
    cy.get('@password').type('pi3.1415')
    cy.get('@loginButton').click()
    cy.get('#logout').as('logout')
    cy.get('@logout').should('have.text', 'Log out')
    // cy.get('@logout').click()
  })
})
