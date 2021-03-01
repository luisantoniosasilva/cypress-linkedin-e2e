/// <reference types="cypress" />

const fx = require('../fixtures/dataBase.json')

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.getByTracking("guest_homepage-basic_nav-header-signin").click();
        cy.locationPathname('/login')
    })
    it('Logging in successfully', () => {
        cy.getById("username").should('be.enabled').type(fx.login.email)
        cy.getById("password").should('be.enabled').type(fx.login.password)
        cy.getByLitms("login-submit").click();
        cy.locationPathname('/feed/')
        cy.getByControlLike("sharebox_focus").should('contain.text', 'Começar publicação')
    });
    
    it('Logging in with incorrect password', () => {
        cy.getById("username").should('be.enabled').type(fx.login.email)
        cy.getById("password").should('be.enabled').type("WRONG PASSWORD")
        cy.getByLitms("login-submit").click();
        
        cy.getById("error-for-password").should('contain.text', 'That’s not the right password. Forgot password?')
        cy.getById("forgot-password-link").should('contains.attr', 'href', '/checkpoint/rp/request-password-reset')
    })
    
    it('Logging in with incorrect password', () => {
        cy.getById("username").should('be.enabled').type("INVALID EMAIL")
        cy.getById("password").should('be.enabled').type(fx.login.password)
        cy.getByLitms("login-submit").click();
        
        cy.getById("error-for-username").should('contain.text', 'Please enter a valid username')
    })
    
    it('Show password', () => {
        cy.getById("username").should('be.enabled').type(fx.login.email)
        cy.getById("password").should('be.enabled').should('have.attr', 'type', 'password').type(fx.login.password)
        
        cy.getById("password-visibility-toggle")
        .should('contain.text', 'show')
        .click()
        .should('contain.text', 'hide')
        
        cy.getById("password").should('be.enabled').should('have.attr', 'type', 'text')
        
        cy.getById("password-visibility-toggle")
        .should('contain.text', 'hide')
        .click()
        .should('contain.text', 'show')
        
        cy.getById("password").should('be.enabled').should('have.attr', 'type', 'password')
    })
    
    it('Login with valid credentials of an unregistered user', () => {
        cy.getById("username").should('be.enabled').type("newemail@cypress.io")
        cy.getById("password").should('be.enabled').type(fx.login.password)
        cy.getByLitms("login-submit").click();
        cy.url().should('include', '/checkpoint/challenge/')
        //TODO Create assertions for the iFrame
    });
});