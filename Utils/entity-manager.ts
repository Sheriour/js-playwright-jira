import { setTimeout } from 'timers/promises';

import { JiraProject } from "@root/models/jira-project";
import { JiraAPI } from '@root/Utils/jira-api';

export class EntityManager {

    static project: JiraProject;

    static async registerProject(project: JiraProject){
        this.project = project;
    }

    static async  deleteEntities(){
        await this.deleteProject();
    }

    static async  deleteProject(){
        if (this.project) {
            let iterator = 0;
            const maxIterations = 3;

            while (!this.project.Id && iterator < maxIterations){
                this.project.Id = await JiraAPI.getProjectIdByName(this.project.Name);
                //1 second wait between retries
                await setTimeout(1000);
            }
            await JiraAPI.sendDelete("/3/project/" + this.project.Id);
        }
    }
}