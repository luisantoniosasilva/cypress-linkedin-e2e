/// <reference types="cypress" />

const faker = require('faker-br');

describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.getByTracking("guest_homepage-basic_nav-header-join").click()
        cy.locationPathname('/signup/cold-join')
    })
    it('Registering successfully', () => {
        cy.getById("email-or-phone").should('be.enabled').type(faker.internet.email())
        cy.getById("password").should('be.enabled').type(faker.internet.password())
        cy.getByTracking("registration-frontend_join-form-submit").should('contain.text', 'Agree & Join').click()
        cy.getById("first-name").should('be.enabled').type(faker.name.firstName())
        cy.getById("last-name").should('be.enabled').type(faker.name.lastName())
        cy.getByTracking("registration-frontend_join-form-submit").should('contain.text', 'Continue').click()
        cy.getIframeById(".challenge-dialog__iframe", "select-register-phone-country").select('br')
        cy.getIframeById(".challenge-dialog__iframe", "register-verification-phone-number").should('be.enabled').type(faker.phone.phoneNumberFormat())
        cy.getIframeById(".challenge-dialog__iframe", "register-phone-submit-button").should('contain.text', 'Submit').click()
    });
    
    it('Making an attempt to registe with invalid email', () => {
        cy.getById("email-or-phone").should('be.enabled').type("INVALID EMAIL")
        cy.getById("password").should('be.enabled').type(faker.internet.password())
        cy.getByTracking("registration-frontend_join-form-submit").should('contain.text', 'Agree & Join').click()
        cy.getByRole("alert").should('contain.text', 'Please enter a valid email address or mobile number.')
    });
    
    it('Making an attempt to register with less than 6 characters of password', () => {
        cy.getById("email-or-phone").should('be.enabled').type(faker.internet.email())
        cy.getById("password").should('be.enabled').type("123")
        cy.getByTracking("registration-frontend_join-form-submit").should('contain.text', 'Agree & Join').click()
        cy.getByRole("alert").should('contain.text', 'Password must be 6 characters or more.')
    });

    it('Making an attempt to register without entering the first name', () => {
        cy.getById("email-or-phone").should('be.enabled').type(faker.internet.email())
        cy.getById("password").should('be.enabled').type(faker.internet.password())
        cy.getByTracking("registration-frontend_join-form-submit").should('contain.text', 'Agree & Join').click()
        cy.getById("last-name").should('be.enabled').type(faker.name.lastName())
        cy.getByTracking("registration-frontend_join-form-submit").should('contain.text', 'Continue').click()
        cy.getByRole("alert").should('contain.text', 'Please enter your first name.')
    });
    
    it('Making an attempt to register without entering the last name', () => {
        cy.getById("email-or-phone").should('be.enabled').type(faker.internet.email())
        cy.getById("password").should('be.enabled').type(faker.internet.password())
        cy.getByTracking("registration-frontend_join-form-submit").should('contain.text', 'Agree & Join').click()
        cy.getById("first-name").should('be.enabled').type(faker.name.firstName())
        cy.getByTracking("registration-frontend_join-form-submit").should('contain.text', 'Continue').click()
        cy.getByRole("alert").should('contain.text', 'Please enter your last name.')
    });
});