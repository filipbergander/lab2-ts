// Importerar interfacet Todo
import { Todo } from './interface';
import { addTodo } from './addTodo';

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

    // När användaren lägger till en ny att göra uppgift
    addTodo(task: string, priority: number): boolean {
        if (task.length > 0 && ((priority === 1) || (priority === 2) || (priority === 3))) {
            this.todos.push({ task, completed: false, priority });
            this.saveToLocalStorage();
            return true;
        } else {
            return false;
        }
    }

    // När användaren markerar en uppgift som utförd
    public markTodoCompleted(todoIndex: number): void {
        this.todos = this.todos.filter(t => t.task !== this.todos[todoIndex].task);
        this.saveToLocalStorage();
    }

    // För att hämta todos-arrayen
    getTodos(): Todo[] {
        const storedTodo = localStorage.getItem("todos-key");
        if (storedTodo) {
            const rawTodo = JSON.parse(storedTodo); // Om todos finns lagrade i localStorage, returneras de som en array
            return rawTodo.map((t: { task: string; completed: boolean; priority: number; }) =>
                new Todo(t.task, t.completed, t.priority));
        } else {
            return []; // Om inga todos finns lagrade i localStorage, returneras en tom array
        }
    }

    // För att spara todos-arrayen inom localStorage 
    public saveToLocalStorage(): void {
        localStorage.setItem("todos-key", JSON.stringify(this.todos))
    }

    // För att ladda todos-array från localStorage
    loadFromLocalStorage(): void {
        const storedTodo = localStorage.getItem("todos-key");
        if (storedTodo) {
            this.todos = JSON.parse(storedTodo);
        } else return;
    }
}