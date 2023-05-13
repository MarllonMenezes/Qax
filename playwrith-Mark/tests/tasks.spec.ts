import {test,expect} from "@playwright/test";
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TasksPage } from "./support/pages/tasks";
import  data from './fixtures/task.json'

test.describe('cadastro de tarefas', () => {
    test("deve fornecer uma nova tarefa", async ({ page, request, }) => {
        const task = data.success as TaskModel;

        await deleteTaskByHelper(request, task.name)
        
    const taskPage: TasksPage = new TasksPage(page);

    await taskPage.go(); // acessa a página
    await taskPage.create(task); // cria uma tarefa
    await taskPage.shouldHaveTask(task.name); // verifica se a tarefa foi criada
    await taskPage.alerthaveText('Task already exists'); // verifica se a mensagem de erro foi exibida
        
        
    });

    test('não deve permitir criar uma tarefa duplicada', async ({ page, request }) => {
        const task = data.duplicate as TaskModel;

        
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

    })

    test('campo obrigatório', async ({ page }) => {
        const task = data.required as TaskModel;

        const taskPage: TasksPage = new TasksPage(page);

        await taskPage.go();
        await taskPage.create(task);

        
        const validationMessage = await taskPage.inputTaskName.evaluate(e =>(e as HTMLInputElement).validationMessage);
        expect(validationMessage).toEqual('This is a required field');
    })

})
test.describe('atualização de tarefas', () => {

    test('deve concluir uma tarefa', async ({ page,request}) => {
        const task = data.update as TaskModel;

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        const taskPage: TasksPage = new TasksPage(page);

        await taskPage.go();
        await taskPage.toggle(task.name);
        await taskPage.shouldBeDone(task.name);  

    })
})