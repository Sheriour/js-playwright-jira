import { expect, type Locator, type Page } from '@playwright/test';

export class AtlassianStartPage {

    readonly page: Page;

    readonly homePageButton: Locator;
    readonly jiraButton: Locator;

    constructor(page: Page){
        this.page = page;

        this.homePageButton = page.getByTestId('primary-button-home');
        this.jiraButton = page.getByRole('link', { name: 'Jira Work Management marek-dziekan-automation' });

    }

    async isUserLoggedIn(){
        await expect(this.homePageButton).toHaveText('Home');
    }

    async goToJiraSoftware(){
        await this.jiraButton.click();
    }
}