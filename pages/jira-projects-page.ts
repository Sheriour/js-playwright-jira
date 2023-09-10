import { expect, type Locator, type Page } from '@playwright/test';

export class JiraProjectsPage {

    readonly page: Page;

    readonly projectsHeader: Locator;
    readonly newProjectButton: Locator;

    constructor(page: Page){
        this.page = page;

        this.projectsHeader = page.getByRole('heading', { name: 'Projects' });
        this.newProjectButton = page.getByTestId('global-pages.directories.projects-directory-v3.create-projects-button');
    }

    /**
     * Clicks the "Create new project" button
     */
    async createNewProject(){
        await this.newProjectButton.click();
    }
}