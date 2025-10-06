import { recurse } from 'cypress-recurse';
class homePage {
    elements = {
        checkinDate: () => cy.get('div.react-datepicker__input-container>input.form-control').eq(0),
        checkoutDate: () => cy.get('div.react-datepicker__input-container>input.form-control').eq(1),
        checkAvailabilityBtn: () => cy.contains('button', 'Check Availability'),
    }
    enterCheckinDate(year, month, date) {

        this.elements.checkinDate().click()
        //this.elements.checkinDate().type(date)
        this.selectYear(year);
        this.selectMonth(month);
        cy.get('.react-datepicker__header').click()
        cy.contains(date).click()
    }
    enterCheckoutDate(year, month, date) {
        this.elements.checkoutDate().click()
        //this.elements.checkoutDate().type(date)
        this.selectYear(year);
        this.selectMonth(month);
        cy.get('.react-datepicker__header').click()
        cy.get(`.react-datepicker__day:contains("${date}")`).last().click()
    }
    selectMonth(month) {
        recurse(() => cy.get('h2.react-datepicker__current-month').invoke('text'), // Get the text of the element
            (text) => {
                // Split the text by one or more whitespace characters (\s+)
                const words = text.split(/\s+/);

                // Log the resulting array of words
                cy.log(words);

                if (!words[0].includes(month)) {

                    cy.get('button[aria-label="Next Month"]').click();
                    return false;

                } else {
                    return true;
                }
            }, { limit: 12 }
        );
    }

    selectYear(year) {
        recurse(() => cy.get('h2.react-datepicker__current-month').invoke('text'), // Get the text of the element
            (text) => {
                // Split the text by one or more whitespace characters (\s+)
                const words = text.split(/\s+/);

                // Log the resulting array of words
                cy.log(words);

                if (words[1] == year) {
                    cy.log('Year selected');
                    return;

                } else if (words[1] > year) {

                    cy.get('button[aria-label="Next Month"]').click();

                }
            }, { limit: 12 }
        );
    }

    clickCheckAvailability() {
        this.elements.checkAvailabilityBtn().click();
    }
}
module.exports = new homePage()