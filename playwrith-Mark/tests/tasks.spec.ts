import {test,expect} from "@playwright/test";
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TasksPage } from "./support/pages/tasks";



test("deve fornecer uma nova tarefa", async ({ page, request, }) => {
    
    const task: TaskModel = {
        name: 'Ler um livro de typescript',
        is_done: false,
    }
   
    await deleteTaskByHelper(request, task.name)

    
   
   const taskPage: TasksPage = new TasksPage(page);

   await taskPage.create(task); // cria uma tarefa
   await taskPage.shouldHaveTask(task.name); // verifica se a tarefa foi criada
   await taskPage.alerthaveText('Task already exists'); // verifica se a mensagem de erro foi exibida
    
    
});

test('não deve permitir criar uma tarefa duplicada', async ({ page, request }) => {
    const task: TaskModel = {
        name: 'comprar katchup',
        is_done: false,
    }

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

})