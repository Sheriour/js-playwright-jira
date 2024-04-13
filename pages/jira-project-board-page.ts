import { expect, type Locator, type Page } from '@playwright/test';

export class JiraProjectBoardPage {

    readonly page: Page;

    readonly kanbanCreateIssue: Locator;
    readonly scrumNoSprints: Locator;
    readonly teamManagedProjectText: Locator;
    readonly companyManagedProjectText: Locator;
    readonly globalCreateButton: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.kanbanCreateIssue = this.page.getByTestId('platform-inline-card-create.ui.trigger.visible.button').first();
        this.scrumNoSprints = this.page.getByText('Get started in the backlog');
        this.teamManagedProjectText = this.page.getByText('You\'re in a team-managed project');
        this.companyManagedProjectText = this.page.getByText('You\'re in a company-managed project');
        this.globalCreateButton = this.page.getByTestId('create-button-wrapper');
    }

    /**
     * Checks if the project has Kanban-specific issue creation button visible
     */
    async seeProjectIsKanban(){
        await expect(this.kanbanCreateIssue).toBeVisible();
    }

    /**
     * Checks if the project has Scrum-specific text visible
     */
    async seeProjectIsScrum(){
        await expect(this.scrumNoSprints).toBeVisible();
    }

    /**
     * Checks if project is team managed
     */
    async seeProjectIsTeamManaged(){
        await expect(this.teamManagedProjectText).toBeVisible();
    }
    
    /**
     * Checks if project is team managed
     */
    async seeProjectIsCompanyManaged(){
        await expect(this.companyManagedProjectText).toBeVisible();
    }

    /**
     * Waits and checks if project header displays the correct name
     */
    async waitForProjectPageWithHeaderToLoad(projectName: string){
        await this.page.getByRole('heading', { name: projectName }).waitFor({state: 'visible', timeout: 20000});
    }
}