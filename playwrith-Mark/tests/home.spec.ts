import {test, expect} from '@playwright/test';

test('web app deve estar online', async ({page}) => {
  await  page.goto('http://192.168.1.3:3000/');
  await  expect(page).toHaveTitle('Gerencie suas tarefas com Mark L');
});
