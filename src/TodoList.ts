// Importerar interfacet Todo
import { Todo } from './IfTodo';

// Klass som definierar en todolista med metoder för att hantera uppgifter/todos
export class TodoList {
    private todos: Todo[] = []; // Array för todo-objekt

    // Konstruktor som används för att ladda in sparade todos från localStorage och körs när nya todolist objekt skapas
    constructor() {
        this.loadFromlocalStorage();
    }
    // När användaren lägger till en ny att göra uppgift
    public addTodo(task: string, priority: number): boolean {

        // Validerar namn på en uppgift, prioritet mellan numren 1-3 samt förhindrar dubletter
        if (task.length > 0 && priority >= 1 && priority <= 3 && !this.todos.find(todo => todo.task === task)) {
            const newTodo: Todo = {
                task, completed: false, priority // Alla nya todos som skapas ska självklart inte vara completed därav false
            };
            this.todos.unshift(newTodo); // Lägger till den nya uppgiften som objekt först i arrayen
            this.saveTolocalStorage(); // Sparar den nya uppgiften i localStorage
            return true; // Stämmer all validering så skapas en ny uppgift och true returneras
        } else {// Om det inte angivits på korrekt sätt i textfälten så returnerar den false vilket används felmeddelanden i DOM
            return false;
        }
    }

    // När användaren markerar en uppgift som utförd, todoIndex är indexet i arrayen, exempelvis 0 för första uppgiften och sedan -> 1, 2 osv
    public markTodoCompleted(todoIndex: number): void {
        this.todos[todoIndex].completed = this.todos[todoIndex].completed ? false : true; // Växlar uppgiften mellan avklarad och ej avklarad (true/false), ternary operator
        this.saveTolocalStorage(); // Sparar ändringen till localStorage
    }

    // För att hämta todos-arrayen
    public getTodos(): Todo[] {
        return this.todos; // Returnerar hela arrayen med todos
    }

    // För att spara todos-arrayen inom localStorage 
    public saveTolocalStorage(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos)) // Sparar todos inom localStorage
    }

    // För att hämta todos-array från localStorage
    public loadFromlocalStorage(): void {
        const storedTodo = localStorage.getItem("todos");
        if (storedTodo) { // Om det finns något sparat i localStorage
            this.todos = JSON.parse(storedTodo); // Hämtar in den sparade arrayen från localStorage och laddar in den i todos-arrayen
        }
    }
    // Rensar alla todos och tar bort dem från localStorage
    public clearTodos(): void {
        this.todos = []; // Tömmer arrayen
        localStorage.clear();// Tömmer localStorage
    }
    // Sorterar todos efter deras prioritet i stigande ordning
    public sortTodosByPriorityAsc(): void {
        this.todos.sort((a, b) => a.priority - b.priority);
    }

    // Sorterar todos efter deras prioritet i fallande ordning
    public sortTodosByPriorityDesc(): void {
        this.todos.sort((a, b) => b.priority - a.priority);
    }

    // För att ta bort en uppgift inom listan av todos
    public removeTodo(index: number): void {
        this.todos.splice(index, 1); // Tar bort en specifik todo från arrayen
        this.saveTolocalStorage(); // Sparar ändringen i localStorage
    }
}