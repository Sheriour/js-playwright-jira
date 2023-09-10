import { test, expect } from '@playwright/test';
import { LoginPage } from '@root/pages/login-page';
import { AtlassianStartPage } from '@root/pages/atlassian-start-page';
import { JiraProjectsPage } from '@root/pages/jira-projects-page';
import { JiraProjectCreationPage } from '@root/pages/jira-project-creation-page';

test.beforeEach(async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.loginWithDefaultCredentials();

    const startPage = new AtlassianStartPage(page);
    await startPage.goToJiraSoftware();

    const projectsPage = new JiraProjectsPage(page);
    await projectsPage.createNewProject();
})

test('Create a team managed kanban project', async ({page})=>{
    const projectCreationPage = new JiraProjectCreationPage(page);
    await projectCreationPage.selectProjectTemplateGroup("Software Development");
    await projectCreationPage.selectProjectTemplate("Kanban");
    await projectCreationPage.useTemplate();
    await projectCreationPage.selectProjectManagementType("team-managed");
    await projectCreationPage.fillProjectName("testname");
})