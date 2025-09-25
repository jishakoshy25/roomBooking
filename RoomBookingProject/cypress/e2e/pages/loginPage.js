class loginPage {
    elements = {
        usernameField: () => cy.get("#username"),
        passwordField: () => cy.get("#password"),
        loginBtn: () => cy.get("#doLogin"),
        alertInvalid: () => cy.get('.alert-danger')
    }
    enterUsername(username){
        this.elements.usernameField().type(username)
    }
    enterPassword(password){
        this.elements.passwordField().type(password)
    }
    loginClick(){
        this.elements.loginBtn().click()
    }
}
module.exports = new loginPage();