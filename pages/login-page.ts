import { type Locator, type Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly continueButton: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;

        this.emailInput = page.getByPlaceholder('Enter your email');
        this.passwordInput = page.getByPlaceholder('Enter password');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    async goTo(){
        await this.page.goto('https://id.atlassian.com/');
    }

    async loginWithDefaultCredentials(){
        //The trailing "!" allows TS to ignore the fact that this could return null
        const username :string = process.env.jira_api_username!;
        const password :string = process.env.jira_user_password!;
        await this.fillUsernameAndContinue(username);
        await this.fillPasswordAndLogIn(password);
    }

    async fillUsernameAndContinue(username: string){
        await this.emailInput.click();
        await this.emailInput.fill(username);
        await this.continueButton.click();
    }

    async fillPasswordAndLogIn(password: string){
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}