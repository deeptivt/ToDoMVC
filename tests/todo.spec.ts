import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

test.describe('TodoMVC - Stable Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://react-todomvc.netlify.app/');
  });

  test('Add todo item (relative assertion)', async ({ page }) => {
    const todoPage = new TodoPage(page);

    const initialCount = await todoPage.getTodoCount();
    await todoPage.addTodo('Learn Playwright');

    await todoPage.expectTodoCountToBe(initialCount + 1);
    await expect(page.getByText('Learn Playwright')).toBeVisible();
  });

  test('Complete a todo item', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodo('Complete this task');
    const lastIndex = (await todoPage.getTodoCount()) - 1;

    await todoPage.completeTodo(lastIndex);

    const completedTodo = page.locator('.todo-list li').nth(lastIndex);
    await expect(completedTodo).toHaveClass(/completed/);
  });

  test('Delete a todo item', async ({ page }) => {
    const todoPage = new TodoPage(page);

    const initialCount = await todoPage.getTodoCount();
    await todoPage.addTodo('Delete me');

    await todoPage.deleteTodo(initialCount);
    await todoPage.expectTodoCountToBe(initialCount);
  });

});
