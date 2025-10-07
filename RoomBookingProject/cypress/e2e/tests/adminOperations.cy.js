import loginPage from "../pages/loginPage"
import adminHomePage from "../pages/adminHomePage"
import updateRoom from "../pages/updateRoom"
describe('perform admin operations', () => {
    beforeEach(() => {
        // Navigate to the login page before each test
        cy.visit('https://automationintesting.online/admin')
    })
    it('Create Room', () => {
        cy.intercept('POST', '/api/room').as('createRoom')
        loginPage.enterUsername('admin')
        loginPage.enterPassword('password')
        loginPage.loginClick()
        cy.url().should('include', '/rooms')
        cy.contains('Restful Booker Platform Demo')
        adminHomePage.enterRoomName('301')
        adminHomePage.selectRoomType('Single')
        adminHomePage.selectAccessiblity('true')
        adminHomePage.enterRoomPrice('140')
        adminHomePage.selectWifiCheckbox()
        adminHomePage.clickCreateButton()
        cy.wait('@createRoom').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
            cy.log(response.body)
            expect(response.body).to.have.property('success')
        })
    })
    it('Update Room Details', () => {
        cy.intercept('PUT', '/api/room/*').as('updateRoom')
        cy.intercept('GET', '/api/room/*').as('getRoom')
        loginPage.enterUsername('admin')
        loginPage.enterPassword('password')
        loginPage.loginClick()
        cy.url().should('include', '/rooms')
        cy.contains('Restful Booker Platform Demo')
        adminHomePage.clickRoomRow()
        cy.url().should('include', '/room/')
        cy.contains('button', 'Edit').click()
        updateRoom.enterRoomPrice('160')
        updateRoom.enterDescription('added new description')
        updateRoom.clickUpdateBtn()
        cy.wait('@updateRoom').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            cy.log(response.body)
            expect(response.body).to.have.property('success')
        })
        cy.wait('@getRoom').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            cy.log(response.body)
            expect(response.body).to.have.property('roomName', '301')
            expect(response.body).to.have.property('roomid')
        })
    })
    it('Delete room', () => {
        cy.intercept('DELETE', '/api/room/*').as('deleteRoom')
        loginPage.enterUsername('admin')
        loginPage.enterPassword('password')
        loginPage.loginClick()
        cy.url().should('include', '/rooms')
        cy.contains('Restful Booker Platform Demo')
        adminHomePage.clickDeleteButton()
        cy.wait('@deleteRoom').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            cy.log(response.body)
            adminHomePage.elements.roomName301().should('not.exist')
        })
    })
    afterEach(() => {
        cy.log('After each test: Clean up');
    })
    after(() => {
        // Runs once after all tests
        cy.log('After all tests: Final teardown');
        cy.url().then(($url) => {
            if ($url.includes('/rooms')) {
                adminHomePage.clickLogout()
            }
        })
    });
})