const Login = require("../page-object/Login");
const homePage = require("../page-object/homePage")

context('Test suit POM', () => {

    it('Home page load porperly',() => {
        homePage.visit();
        homePage.verifyHomePageLoads();
    })

    it('Login failed - user doesnt exist',() => {
        Login.visit()
        cy.fixture("loginData").then((data)=>{
            Login.loginProcess(data.testCaseLoginFailed1.email,data.testCaseLoginFailed1.password)
        })
        Login.verifyBlockErrorMessage()

    })

    it('Login failed 2 - user blocked after four attemps',() => {
        Login.visit()
        cy.fixture("loginData").then((data)=>{
            for (let i = 0; i < 4; i++) {
                Login.loginProcess(data.testCaseLoginFailed2.email,data.testCaseLoginFailed2.password)
              }
        })
        Login.verifyBlockErrorMessage()

    })

    it('Login success - user login',() => {
        Login.visit()
        Login.loginProcess('tt','123')
        cy.fixture("loginData").then((data)=>{
            cy.intercept(data.testCaseLoginSuccess.method,data.testCaseLoginSuccess.url).as('afterlogin')
            Login.loginProcess(data.testCaseLoginSuccess.email,data.testCaseLoginSuccess.password)
            Login.verifyAfterLoginStatusCode()
        })
        Login.verifySuccesLogin()
    })
})