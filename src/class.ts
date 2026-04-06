// Importerar interfacet Todo
import { Todo } from './interface';

export class TodoList implements Todo {
    task: string;
    completed: boolean;
    priority: number;
    private todos: Todo[] = []; // Array för todo-objekt

    constructor(task: string, completed: boolean, priority: number) {
        this.task = task;
        this.completed = completed;
        this.priority = priority;
        this.loadFromLocalStorage();
    }

    addTodo(task: string, priority: number): boolean {
        if (task.length > 0 && (priority === )) {
            this.todos.push(newTodo);
            this.saveToLocalStorage();
            return true;
        } else return false;
    }

    markTodoCompleted(todoIndex: number): void {

    }
    // För att hämta todos-arrayen
    getTodos(): Todo[] {
        return this.todos;
    }

    // För att spara todos-arrayen inom localStorage 
    saveToLocalStorage(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos))
    }
    // För att ladda todos-array från localStorage
    loadFromLocalStorage(): void {
        const storedTodo = localStorage.getItem("todos");
        if (storedTodo) {
            this.todos = JSON.parse(storedTodo);
        } else return;
    }
}