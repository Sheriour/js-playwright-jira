import type { APIRequestContext } from "@playwright/test";
import { APIRequest } from "@playwright/test";

export class JiraAPI{

    static apiBaseUrl: string  = 'https://marek-dziekan-automation.atlassian.net/rest/api';
    static request: APIRequestContext;

    /**
     * Inject Playwrights APIRequestContext
     * 
     * @param request APIRequestContext
     */
    static async injectRequest(request: APIRequest){
        this.request = await request.newContext();
    }

    /**
     * Generate a Basic auth token
     * This method cannot be async as introducing an "await" into playwright.config.ts interferes with the VS code and PW plugin integration,
     * or at least the integration no longer shows the test buttons in spec files.
     * 
     * @returns Base64 encoded Basic auth token
     */
    static generateBasicToken(): string{
        const username :string = process.env.jira_api_username!;
        const secret :string = process.env.jira_api_secret!;
        
        return btoa(username +":"+ secret);
    }

    /**
     * Queries Jira API to retrieve project Id based on project name
     * 
     * @param projectName   Name of the project to query
     * @returns             Id of the project
     */
    static async getProjectIdByName(projectName: string): Promise<string> {
        const response = await this.request.get(this.apiBaseUrl + '/3/project/search', {
            params: {
              query: projectName
            }
          });
        return require('jsonpath').query(await response.json(), 'values[0].id');
    }

    static async sendDelete(path: string){
        const response = await this.request.delete(this.apiBaseUrl + path);
        console.log(await response.text());
        
    }
}