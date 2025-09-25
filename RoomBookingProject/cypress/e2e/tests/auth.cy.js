describe('Authentication API Test', () => {
    it('successful authentication', () => {
        cy.request('POST', 'https://restful-booker.herokuapp.com/auth', {
            "username": "admin",
            "password": "password123"
        }).then((response)=>{
            window.localStorage.setItem('token',response.body.token)
            cy.log(response.status)
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token')
        })

    })
     it('invalid authentication', () => {
        cy.request('POST', 'https://restful-booker.herokuapp.com/auth', {
            "username": "admin",
            "password": "password"
        }).then((response)=>{
            window.localStorage.setItem('token',response.body.token)
            cy.log(response.status)
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            expect(response.body).to.not.have.property('token')
             expect(response.body).to.have.property('reason','Bad credentials')
        })

    })
})