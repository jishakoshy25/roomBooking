class updateRoom {
    elements = {
        roomPriceField: () => cy.get('#roomPrice'),
        description: () => cy.get('textarea#description'),
        updateBtn: () => cy.get('#update')
    }
    enterRoomPrice(roomPrice) {
        this.elements.roomPriceField().clear();
        this.elements.roomPriceField().type(roomPrice)
    }
    enterDescription(description) {
        this.elements.description().clear()
        this.elements.description().type('added new description')
    }
    clickUpdateBtn() {
        this.elements.updateBtn().click()
    }
}
module.exports = new updateRoom()