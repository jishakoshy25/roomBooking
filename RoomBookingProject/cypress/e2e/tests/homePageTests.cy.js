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
            'section#rooms h2.display-5', 'section#location h2.display-5', 'section#contact h3.h4']
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
        cy.url().should('equal', 'https://automationintesting.online/')
    })
    it('contact form: valid data', () => {
        cy.intercept('POST', '/api/message').as('messageOwner')
        homePage.enterNameField("jjosjo")
        homePage.enterEmailField("jjosjo@gmail.com")
        homePage.enterPhoneField("12222222222")
        homePage.enterSubjectField("I need a room")
        homePage.enterDescriptionField("I need a room on 29th")
        homePage.clickSubmitButton()
        cy.wait('@messageOwner').then((interception) => {
            expect(interception.response.statusCode).eq(200)
            cy.log(interception.response.body)
            expect(interception.response.body).to.have.property('success', true)
            cy.fixture('message.json').then((fixtureData) => {
                expect(interception.request.body).to.deep.equal(fixtureData)
            })

        })
    })
    it('contact form: invalid input', () => {
        cy.intercept('POST', '/api/message').as('messageOwner')
        homePage.enterNameField("jjosjo")
        homePage.enterEmailField("jjosjo@gmail.com")
        homePage.enterPhoneField("12222222222")
        homePage.enterSubjectField("aji")
        homePage.enterDescriptionField("duagu")
        homePage.clickSubmitButton()
        cy.wait('@messageOwner').then((interception) => {
            expect(interception.response.statusCode).eq(400)
            cy.log(interception.response.body)
            const possibleValues = ['Subject must be between 5 and 100 characters.', 'Message must be between 20 and 2000 characters.'];
            expect(interception.response.body[0]).to.be.oneOf(possibleValues)
            expect(interception.response.body[1]).to.be.oneOf(possibleValues)
        })
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