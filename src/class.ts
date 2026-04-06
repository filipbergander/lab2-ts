import type { Todo } from './interface';

export class TodoList {
    todos: Todo[] = [];

    constructor() {
        this.loadFromLocalStorage();
    }

    addTodo(task: string, priority: number): boolean {

    }

    markTodoCompleted(todoIndex: number): void {

    }

    getTodos(): Todo[] {

    }

    saveToLocalStorage(): void {

    }

    loadFromLocalStorage(): void {

    }
}