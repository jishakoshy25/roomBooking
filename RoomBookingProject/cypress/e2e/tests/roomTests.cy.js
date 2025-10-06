import homePage from "../pages/homePage"

describe('Check Room Availability', () => {
    it('check availability', () => {
        cy.intercept('GET', '/api/room').as('getRoomsAvailable')
        cy.visit('https://automationintesting.online/')
        homePage.enterCheckinDate(2025, 'October', 27)
        homePage.enterCheckoutDate(2025, 'October', 29)
        homePage.clickCheckAvailability()
        cy.wait('@getRoomsAvailable').then(({ response }) => {
            expect(response.statusCode).eq(200)
            cy.log(response.body)
            expect(response.body.rooms).to.have.length.greaterThan(0)
            expect(response.body.rooms[0]).to.have.property('roomid')
            expect(response.body.rooms[0]).to.have.property('roomName')
            expect(response.body.rooms[0]).to.have.property('type')

        })
    })
})