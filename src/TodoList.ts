// Importerar interfacet Todo
import { Todo } from './IfTodo';

export class TodoList implements Todo {
    task: string;
    completed: boolean;
    priority: number;
    private todos: Todo[] = []; // Array för todo-objekt

    // Konstuktor som ska användas när en ny todo skapas
    constructor(task: string, completed: boolean, priority: number) {
        this.task = task;
        this.completed = completed;
        this.priority = priority;
    }

    // När användaren lägger till en ny att göra uppgift
    public addTodo(task: string, priority: number): boolean {
        if (task.length > 0 && priority >= 1 && priority <= 3) {
            const newTodo: Todo = {
                task, completed: false, priority // Alla nya todos som skapas ska självklart inte vara completed därav false
            };
            this.todos.push(newTodo); // Lägger till den nya uppgiften som objekt i arrayen
            this.saveToLocalStorage(); // Sparar den nya uppgiften i localstorage
            return true;
        } else {
            return false; // Om inget angivits eller gjorts på rätt sätt med prioritet så returnerar den false vilket kan användas för att visa ett felmeddelande i DOM
        }
    }

    // När användaren markerar en uppgift som utförd
    public markTodoCompleted(todoIndex: number): void {
        this.todos[todoIndex].completed = this.todos[todoIndex].completed ? false : true; // Switcha uppgiften mellan avklarad och ej avklarad, ternary operator
        this.saveToLocalStorage(); // Sparar ändringen till localstorage
    }

    // För att hämta todos-arrayen
    public getTodos(): Todo[] {
        return this.todos;
    }

    // För att spara todos-arrayen inom localStorage 
    public saveToLocalStorage(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos))
    }

    // För att hämta todos-array från localStorage
    public loadFromLocalStorage(): void {
        const storedTodo = localStorage.getItem("todos");
        if (storedTodo) {
            this.todos = JSON.parse(storedTodo);
        }
    }
}

/*
const todoList = new TodoList();

todoList.addTodo("Cykla till jobbet", 2);
todoList.addTodo("Städa utomhus", 3);
todoList.addTodo("Laga matlådor", 1);

let newTodo = new TodoList("Laga middag", false, 1);
console.log(newTodo.addTodo)
const todo1 = new TodoList("Cykla", false, 2);
const todo2 = new TodoList("Städa utomhus", true, 3);
const todo3 = new TodoList("Laga matlådor", false, 1);

console.log(todo1);
console.log(todo2);
console.log(todo3);*/