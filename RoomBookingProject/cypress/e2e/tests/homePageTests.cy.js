import homePage from "../pages/homePage"

describe('Check Room Availability', () => {
    beforeEach(() => {
        //Navigate to home page before each test starts
        cy.visit('https://automationintesting.online/')
    })
    it('check availability', () => {
        cy.intercept('GET', '/api/room').as('getRoomsAvailable')
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
    it('book room', () => {
        homePage.enterCheckinDate(2025, 'October', 27)
        homePage.enterCheckoutDate(2025, 'October', 29)
        homePage.clickCheckAvailability()
        homePage.clickBookNowButton()
        cy.url().should('include', 'https://automationintesting.online/reservation/1?checkin=')
    })
    it('check navigation links', () => {
        const links = ['rooms', 'booking', 'amenities', 'location', 'contact', 'admin']
        const section = ['section#rooms h2.display-5', 'section#rooms h2.display-5', 
            'section#rooms h2.display-5', 'section#location h2.display-5','section#contact h3.h4']
        links.forEach((element, index) => {
            homePage.clickLinks(index)
            if (element == 'admin') {
                cy.url().should('equal', `https://automationintesting.online/${element}`)
            } else {
                cy.url().should('equal', `https://automationintesting.online/#${element}`)
                cy.get(`${section[index]}`).elementIsInView()
            }
        })
        homePage.clickBrandLink()
        cy.url().should('equal','https://automationintesting.online/')
    })
    afterEach(() => {
        //Runs after each test
        cy.log('After each test: Check Room Availability ')
    })
    after(() => {
        // Runs once after all tests
        cy.log('After all tests: Final teardown');
    });

})