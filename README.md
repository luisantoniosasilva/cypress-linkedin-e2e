# Cypress End-to-End
A test application using Cypress, an automated end-to-end testing framework using JavaScript.
The elaboration of this project is **exclusively for the study** of the mentioned framework and for this study the [Linkedin](http://www.linkedin.com/ "Linkedin") platform was used.

### How to run this project
#### Project configuration
1. Clone this project to your machine
2. Run `npm install`
3. In cypress/fixture create a file called dataBase.json with the following structure
```json
{
    "login": {
      "email": "YOUR EMAIL",
      "password": "YOUR PASSWORD"
    }
  }
```

#### Running the project
- `npx cypress open` - runs Cypress in GUI mode
- `npx cypress run` - runs Cypress in headless mode

### Test Scenarios
- Register
- Login

### Packages
- [Faker.js](https://www.npmjs.com/package/Faker)
- [cypress-iframe](https://www.npmjs.com/package/cypress-iframe)
