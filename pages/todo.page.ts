import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
  }

  async goto() {
    await this.page.goto('https://react-todomvc.netlify.app/');
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async completeTodo(index: number) {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async deleteTodo(index: number) {
    const todo = this.todoItems.nth(index);
    await todo.hover();
    await todo.locator('.destroy').click({ force: true });
  }

  async getTodoCount(): Promise<number> {
    return await this.todoItems.count();
  }

  async expectTodoCountToBe(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }
}
