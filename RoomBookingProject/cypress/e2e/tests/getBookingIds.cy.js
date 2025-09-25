describe('Get Booking Id API Tests',()=>{
    it('Retrieve all booking ids successfully',()=>{
        cy.request('GET','https://restful-booker.herokuapp.com/booking').then((response)=>{
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length.greaterThan(1)
            expect(response.body[0]).to.have.property('bookingid')
        })
    })
})