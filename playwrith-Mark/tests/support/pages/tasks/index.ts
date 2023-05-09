import { Page } from '@playwright/test';
import { TaskModel } from '../../../fixtures/task.model';

export class TasksPage{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async create(task: TaskModel) {
        const inputTaskname = this.page.locator('input[class*=InputNewTask]');
        await inputTaskname.fill(task.name);
    
        await this.page.click('css=button >> text=Create');
    }
}