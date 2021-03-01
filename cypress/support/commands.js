import 'cypress-iframe'

Cypress.Commands.add("getByTracking", (selector, ...args) => {
    return cy.get(`[data-tracking-control-name=${selector}]`, ...args).should('be.visible')
})

Cypress.Commands.add("getByLitms", (selector, ...args) => {
    return cy.get(`[data-litms-control-urn=${selector}]`, ...args).should('be.visible')
})

Cypress.Commands.add("getByControlLike", (selector, ...args) => {
    return cy.get(`[data-control-name*=${selector}]`, ...args).should('be.visible')
})

Cypress.Commands.add("getById", (selector, ...args) => {
    return cy.get(`#${selector}`, ...args)
})

Cypress.Commands.add("getByRole", (selector, ...args) => {
    return cy.get(`[role=${selector}]`, ...args).should('be.visible')
})

Cypress.Commands.add("getIframeById", (selector1, selector2) => {
    cy.iframe(`${selector1}`).find(`#${selector2}`)
}) 

Cypress.Commands.add("locationPathname", (pathname) => {
    cy.location().then(loc => {
        expect(loc.pathname).to.eq(pathname)
    })
})