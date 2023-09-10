import { expect, type Locator, type Page } from '@playwright/test';

export class AtlassianStartPage {

    readonly page: Page;

    readonly homePageButton: Locator;
    readonly jiraButton: Locator;

    constructor(page: Page){
        this.page = page;

        this.homePageButton = page.getByRole('button', { name: 'Home' });
        this.jiraButton = page.locator('button').filter({ hasText: 'Jira Softwaremarek-dziekan-automation' });
    }

    async isUserLoggedIn(){
        await expect(this.homePageButton).toHaveText('Home');
    }

    async goToJiraSoftware(){
        await this.jiraButton.click();
    }
}