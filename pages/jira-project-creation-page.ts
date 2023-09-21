import { expect, type Locator, type Page } from '@playwright/test';

export class JiraProjectCreationPage {

    readonly page: Page;

    readonly useTemplateButton: Locator;
    readonly projectNameField: Locator;
    readonly createProjectButton: Locator;
    readonly projectKeyInput: Locator;
    

    constructor(page: Page){
        this.page = page;
        
        this.useTemplateButton = page.getByTestId('project-template-select-v2.ui.layout.screens.template-overview.template-overview-card.use-template-button.button');
        this.projectNameField = page.getByTestId('project-create.create-form.name-field.input');
        this.createProjectButton = page.getByTestId('project-create.create-form.create-screen.submit-button').getByRole('button');
        this.projectKeyInput = page.getByTestId('project-create.create-form.advanced-dropdown.key-field.textfield');
    }

    

    /**
     * Selects a specific template group from the list, eg. "Software Development"
     *
     * @param templateGroup Name of the template group
     */
    async selectProjectTemplateGroup(templateGroup: string){
        await this.page.getByRole('button', { name: templateGroup }).click();
    }

    /**
     * Selects a specific template from the list, eg. "Kanban", "Scrum"
     * 
     * @param template  Name of the template
     */
    async selectProjectTemplate(template: string){
        await this.page.getByRole('button', { name: template }).click();
    }

    /**
     * Clicks the button to confirm template selection
     */
    async useTemplate(){
        await this.useTemplateButton.click();
    }

    /**
     * Chooses either a team-managed or company-managed project type
     * 
     * @param managedType   Either "team-managed" or "company-managed"
     */
    async selectProjectManagementType(managedType: string){
        await this.page.getByTestId('project-template-select-v2.ui.layout.screens.project-types.footer.select-project-button-'+managedType).click();
    }

    /**
     * Provide a project name
     * 
     * @param projectName Project name to use
     */
    async fillProjectName(projectName: string){
        await this.projectNameField.fill(projectName);
    }

    /**
     * Wait for project key to autopopulate
     */
    async waitForProjectKey(){
        await expect(this.projectKeyInput).not.toBeEmpty();
    }

        
    /**
     * Click "Create project" to finish creation process
     */
    async clickCreateProject(){
        await this.createProjectButton.click();
    }
}