import { test, expect } from '@playwright/test';
import { LoginPage } from '@root/pages/login-page';
import { AtlassianStartPage } from '@root/pages/atlassian-start-page';

test('Jira Successful Login', async ({page})=>{
    const loginPage = new LoginPage(page);
    loginPage.goTo();
    await loginPage.loginWithDefaultCredentials();
    
    const startPage = new AtlassianStartPage(page);
    await startPage.isUserLoggedIn();
})

//await expect(page.getByRole('heading', { name: 'Projects' })).toHaveText('Projects');