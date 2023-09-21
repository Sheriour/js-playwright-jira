import { test } from '@playwright/test';
import { LoginPage } from '@root/pages/login-page';
import { AtlassianStartPage } from '@root/pages/atlassian-start-page';
import { JiraProjectsPage } from '@root/pages/jira-projects-page';
import { JiraProjectCreationPage } from '@root/pages/jira-project-creation-page';
import { EntityManager } from '@root/Utils/entity-manager';
import { JiraProject } from '@root/models/jira-project';
import { JiraAPI } from '@root/Utils/jira-api';
import { JiraProjectBoardPage } from '@root/pages/jira-project-board-page';

test.beforeEach(async ({page, playwright})=>{
    JiraAPI.injectRequest(playwright.request);

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.loginWithDefaultCredentials();

    const startPage = new AtlassianStartPage(page);
    await startPage.goToJiraSoftware();

    const projectsPage = new JiraProjectsPage(page);
    await projectsPage.createNewProject();
})

test.afterAll(async ()=>{
    await EntityManager.deleteEntities();
})

test.describe.parallel("Project Creation Tests", ()=>{
    test('Create a team managed kanban project', async ({page})=>{
        const project = new JiraProject();
    
        const projectCreationPage = new JiraProjectCreationPage(page);
        await projectCreationPage.selectProjectTemplateGroup("Software Development");
        await projectCreationPage.selectProjectTemplate("Kanban");
        await projectCreationPage.useTemplate();
        await projectCreationPage.selectProjectManagementType("team-managed");
        await projectCreationPage.fillProjectName(project.Name);
        await projectCreationPage.waitForProjectKey();
        await projectCreationPage.clickCreateProject();
    
        EntityManager.registerProject(project);
    
        const projectBoardPage = new JiraProjectBoardPage(page);
        await projectBoardPage.waitForProjectPageWithHeaderToLoad(project.Name);
        await projectBoardPage.seeProjectIsKanban();
        await projectBoardPage.seeProjectIsTeamManaged();
    })
    
    test('Create a company managed scrum project', async ({page})=>{
        const project = new JiraProject();
    
        const projectCreationPage = new JiraProjectCreationPage(page);
        await projectCreationPage.selectProjectTemplateGroup("Software Development");
        await projectCreationPage.selectProjectTemplate("Scrum");
        await projectCreationPage.useTemplate();
        await projectCreationPage.selectProjectManagementType("company-managed");
        await projectCreationPage.fillProjectName(project.Name);
        await projectCreationPage.waitForProjectKey();
        await projectCreationPage.clickCreateProject();
    
        EntityManager.registerProject(project);
    
        const projectBoardPage = new JiraProjectBoardPage(page);
        await projectBoardPage.waitForProjectPageWithHeaderToLoad(project.Name);
        await projectBoardPage.seeProjectIsScrum();
        await projectBoardPage.seeProjectIsCompanyManaged();
    })
})
