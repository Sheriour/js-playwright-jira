import { test, expect } from '@playwright/test';
import { LoginPage } from '@root/pages/login-page';
import { AtlassianStartPage } from '@root/pages/atlassian-start-page';

test('Jira successful login', async ({page})=>{
    const loginPage = new LoginPage(page);
    loginPage.goTo();
    await loginPage.loginWithDefaultCredentials();
    
    const startPage = new AtlassianStartPage(page);
    await startPage.isUserLoggedIn();
})

test('Jira login with invalid username', async ({page})=>{
    const loginPage = new LoginPage(page);
    loginPage.goTo();
    await loginPage.fillUsernameAndContinue('asinvalidastheycome');
    await expect(loginPage.passwordInput).toBeHidden();
})

test('Jira login with invalid password', async ({page})=>{
    const username :string = process.env.jira_api_username!;
    const loginPage = new LoginPage(page);
    loginPage.goTo();
    await loginPage.fillUsernameAndContinue(username);
    await loginPage.fillPasswordAndLogIn('wrongpassword');
    await expect (loginPage.passwordErrorMessage).toBeVisible();
    
})