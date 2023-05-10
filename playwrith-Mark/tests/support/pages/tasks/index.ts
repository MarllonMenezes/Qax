import { Page, expect } from '@playwright/test';
import { TaskModel } from '../../../fixtures/task.model';

export class TasksPage{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async go() {
        await this.page.goto("http://192.168.1.2:3000/");
    }

    async create(task: TaskModel) {
        const inputTaskname = this.page.locator('input[class*=InputNewTask]');
        await inputTaskname.fill(task.name);
    
        await this.page.click('css=button >> text=Create');
    }

    async shouldHaveTask(taskName: string) {
        const target = this.page.locator('css=.task-item p >> text=${taskName}');
        await expect(target).toBeVisible();
    
    }

    async alerthaveText(text: string) {
     const target = this.page.locator('.swa12-html-container');
     await expect(target).toHaveText(text);
    }
}