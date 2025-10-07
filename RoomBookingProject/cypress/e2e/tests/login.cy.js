import loginPage from "../pages/loginPage"
import adminHomePage from "../pages/adminHomePage"
describe('Login', () => {
    beforeEach(() => {
        // Navigate to the login page before each test
        cy.visit('https://automationintesting.online/admin')
    })

    it('Successful Login', () => {
        cy.intercept('POST', '/api/auth/login').as('performlogin')
        cy.intercept('GET', '/api/room').as('getRooms')
        loginPage.enterUsername('admin')
        loginPage.enterPassword('password')
        loginPage.loginClick()
        cy.wait('@performlogin').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            cy.log(response.body)
            expect(response.body).to.have.property('token')
        })
        cy.wait('@getRooms').then(({ request, response }) => {
            cy.log(request.body)
            cy.log(response.body)
            expect(response.statusCode).to.eq(200)
            expect(response.body).to.have.property('rooms')
            expect(response.body.rooms).to.have.length.greaterThan(0)
            expect(response.body.rooms[0]).to.have.property('roomid')
            expect(response.body.rooms[0]).to.have.property('roomName')
            expect(response.body.rooms[0]).to.have.property('type')
        })
        cy.url().should('include', '/rooms')
        cy.contains('Restful Booker Platform Demo')
    })
    it('Login failure', () => {
        cy.intercept('POST', '/api/auth/login').as('performlogin')
        loginPage.enterUsername('admin')
        loginPage.enterPassword('password123')
        loginPage.loginClick()
        cy.wait('@performlogin').then(({ response }) => {
            expect(response.statusCode).to.eq(401)
            cy.log(response.body)
            expect(response.body).to.not.have.property('token')
        })
        cy.url().should('include', '/admin')
        loginPage.elements.alertInvalid().should('be.visible')
        loginPage.elements.alertInvalid().should('have.text', 'Invalid credentials')
        cy.contains('Restful Booker Platform Demo')
    })

    afterEach(() => {
        cy.log('After each test: Clean up');
        cy.url().then(($url) => {
            if ($url.includes('/rooms')) {
                adminHomePage.clickLogout()
            }
        })
    })
}
)