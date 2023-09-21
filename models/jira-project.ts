import {Utils}  from '@root/Utils/utils';

export class JiraProject {
    Name: string;
    Id: string;

    constructor(){
        this.Name = JiraProject.getRandomName();
    }

    static getRandomName(){
        return 'ProjectPW_' + Utils.getRandomString();
    }
}