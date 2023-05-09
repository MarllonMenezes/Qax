import {test} from "@playwright/test";
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TasksPage } from "./support/pages/tasks";



test("deve fornecer uma nova tarefa", async ({ page, request, }) => {
    
    const task: TaskModel = {
        name: 'Ler um livro de typescript',
        is_done: false,
    }
   
    await deleteTaskByHelper(request, task.name)

    await page.goto("http://192.168.1.2:3000/");
   
   const taskPage: TasksPage = new TasksPage(page);

   taskPage.create(task); // cria uma tarefa
   
    const target = page.locator('css=.task-item p >> text=${task.name}');
    
});

test('não deve permitir criar uma tarefa duplicada', async ({ page, request }) => {
    const task: TaskModel = {
        name: 'comprar katchup',
        is_done: false,
    }

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

})