// Importerar interfacet Todo
import { Todo } from './IfTodo';

// Klass som definierar en todolista och bygger på det importerade interfacet Todo
export class TodoList {
    private todos: Todo[] = []; // Array för todo-objekt

    // Konstruktor som används för att ladda in sparade todos från localstorage
    constructor() {
        this.loadFromLocalStorage();
    }
    // När användaren lägger till en ny att göra uppgift
    public addTodo(task: string, priority: number): boolean {
        if (task.length > 0 && priority >= 1 && priority <= 3) { // Om man inte angivit en uppgift eller prioritet mellan 1-3 så skapas ingen ny todo
            const newTodo: Todo = {
                task, completed: false, priority // Alla nya todos som skapas ska självklart inte vara completed därav false
            };
            this.todos.push(newTodo); // Lägger till den nya uppgiften som objekt i arrayen
            this.saveToLocalStorage(); // Sparar den nya uppgiften i localstorage
            return true;
        } else {
            return false; // Om det inte angivits något i textfälten på rätt sätt returnerar den false vilket kan användas för att visa ett felmeddelande i DOM
        }
    }

    // När användaren markerar en uppgift som utförd, todoIndex är indexet i arrayen, exempelvis 0 för första uppgiften och sedan -> 1, 2 osv
    public markTodoCompleted(todoIndex: number): void {
        this.todos[todoIndex].completed = this.todos[todoIndex].completed ? false : true; // Switcha uppgiften mellan avklarad och ej avklarad, ternary operator
        this.saveToLocalStorage(); // Sparar ändringen till localstorage
    }

    // För att hämta todos-arrayen
    public getTodos(): Todo[] {
        return this.todos; // Returnerar hela arrayen med todos
    }

    // För att spara todos-arrayen inom localStorage 
    public saveToLocalStorage(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos)) // Sparar todos inom localstorage
    }

    // För att hämta todos-array från localStorage
    public loadFromLocalStorage(): void {
        const storedTodo = localStorage.getItem("todos");
        if (storedTodo) { // Om det finns något sparat i localstorage
            this.todos = JSON.parse(storedTodo);
        }
    }
    // För att radera alla uppgifter i todo-listan
    public clearTodos(): void {
        this.todos = [];
    }
    // För att kunna sortera todos efter deras prioriteter
    public sortTodosByPriority(): void {
        this.todos.sort((a, b) => a.priority - b.priority);
    }
    
    // För att sortera todos i den omvända ordningen
    public sortTodosBackwardsByPriority(): void {
        this.todos.sort((a, b) => b.priority - a.priority);
    }
}