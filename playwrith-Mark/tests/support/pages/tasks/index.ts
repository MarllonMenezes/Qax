import { Locator, Page, expect } from '@playwright/test';
import { TaskModel } from '../../../fixtures/task.model';

export class TasksPage{
    readonly page: Page;
    readonly inputTaskName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputTaskName = this.page.locator('input[class*=InputNewTask]');
    }

    async go() {
        await this.page.goto("http://localhost:3000/");
    }

    async create(task: TaskModel) {
        await this.inputTaskName.fill(task.name)
        await this.page.click('css=button >> text=Create')
    }

    async toggle(taskName: string) {
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class,"toggle")]`);
        await target.click();
    }

    async shouldHaveTask(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`);
        await expect(target).toBeVisible();
    
    }

    async alerthaveText(text: string) {
     const target = this.page.locator('.swa12-html-container');
     await expect(target).toHaveText(text);
    }

    async shouldBeDone(taskName: string) {
    const target = this.page.getByText(taskName)
    await expect(target).toHaveCSS('text-decoration-line', 'line-through');
      
    }

}