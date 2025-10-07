class adminHomePage {
    elements = {
        roomNameField: () => cy.get('input#roomName'),
        roomTypeDropdown: () => cy.get('select#type'),
        accessibleValue: ()=>cy.get('select#accessible'),
        frontPageLink: () => cy.get('a#frontPageLink'),
        roomPriceField : () => cy.get('input#roomPrice'),
        wifiCheckbox: ()=> cy.get('input#wifiCheckbox'),
        createRoomBtn: () => cy.get('button#createRoom'),
        deleteButton: () => cy.get('div span.fa-remove').last(),
        roomName301: () => cy.get('p#roomName301'),
        logoutBtn: () => cy.get('div#navbarSupportedContent  button.btn')
    }
    clickLogout() {
        this.elements.logoutBtn().click()
    }
    clickFrontPageLink() {
        this.elements.frontPageLink().click()
    }
    enterRoomName(roomName) {
        this.elements.roomNameField().type(roomName)
    }
    selectRoomType(roomType) {
        this.elements.roomTypeDropdown().select(roomType)
    }
    selectAccessiblity(accessible){
        this.elements.accessibleValue().select(accessible)
    }
    enterRoomPrice(roomPrice){
        this.elements.roomPriceField().type(roomPrice)
    }
    selectWifiCheckbox(){
        this.elements.wifiCheckbox().click();
    }
    clickCreateButton(){
        this.elements.createRoomBtn().click()
    }
    clickDeleteButton(){
        this.elements.deleteButton().click()
    }
    clickRoomRow(){
        this.elements.roomName301().eq(0).click()
    }
}
module.exports = new adminHomePage();