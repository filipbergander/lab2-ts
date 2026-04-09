// Hämtar in klassen för todo-listan
import { TodoList } from './TodoList';

const todoList = new TodoList();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form") as HTMLFormElement;
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            addTodo();
        });
    }
})

/**
 * För att lägga till en ny todo
 * @returns - Funktionen returnerar ingenting
 */
function addTodo(): void {
    const taskInput = document.getElementById("todo-assign") as HTMLInputElement;
    const priorityInput = document.getElementById("todo-priority") as HTMLInputElement;

    const task: string = taskInput.value.trim();
    const priority: number = Number(priorityInput.value);

    const newAddedTask = todoList.addTodo(task, priority);
    const errors: string[] = [];

    if (!newAddedTask) { // Om det misslyckades med att skapa en ny todo ges felmeddelanden

        if (!task) {
            errors.push("Ange namn på uppgift!"); // Om användaren inte angett en uppgift att göra i textfältet
        }

        if (!priority) { // Om användaren inte angett en siffra som prioritet mellan numren 1-3 i textfältet
            errors.push("Ange en prioritet mellan siffrorna 1-3")
        }

        displayErrMsg(errors);
        return;

    } if (newAddedTask) { // Om det lyckas med att skapa en ny todo
        renderTodos(); // Anropar funktion för att skapa innehållet i DOM
        taskInput.value = ""; // Nollställer textfälten
        priorityInput.value = "";
        removeErrorMsg(); // Tar bort eventuella felmeddelanden


    }




    // Resettar inputfälten
    /* taskInput.value = "";
     priorityInput.value = "";*/

    /*
    const newTodo = new TodoList(task, false, priority);
    todoList.addTodo(newTodo);*/
}

/**
 * Visar felmeddelanden inom DOM
 * @param errors - En array som innehåller alla felmeddelanden
 */
function displayErrMsg(errors: string[]): void {
    const errContainer = document.getElementById("err-container") as HTMLDivElement;
    const errorArea = document.getElementById("error-area") as HTMLUListElement;

    if (errContainer) {
        errorArea.innerHTML = ""; // Rensar för att inte skapa felmeddelanden på felmeddelanden
        errors.forEach((error) => {
            const errListEl = document.createElement("li"); // Skapar ett li-element
            errListEl.textContent = error; // Varje li-element får sitt innehåll som det tillhörande felmeddelandet
            errListEl.classList.add("error-msg"); // Klass för styling
            errorArea.appendChild(errListEl); // Lägger till varje li inom ul
        })
    }
}

/**
 * Renderar alla todos inom DOM
 */
function renderTodos(): void {
    const todoContainer = document.getElementById("todo-list") as HTMLDivElement;
    todoContainer.innerHTML = ""; // Så att listan inte skapas flera gånger om
    const todos = todoList.getTodos(); // Hämtar in todos-arrayen från klassen

    todos.forEach((todo, index) => {
        // Skapar element
        const div = document.createElement("div");
        const p = document.createElement("p");
        const span = document.createElement("span");
        const checkbox = document.createElement("input");

        // Ger element klasser och typer för styling
        div.className = "todo-task";
        p.className = "p-todo";
        span.className = "span-todo";
        checkbox.type = "checkbox";

        // Ger elementen sina innehåll
        p.textContent = `${todo.task}`;
        span.textContent = `Prioritet: ${todo.priority}`;
        checkbox.checked = todo.completed;
        checkbox.setAttribute("aria-label", todo.completed ? "Avklarad uppgift" : "Ej avklarad uppgift");

        // Vid klick på checkbox ändras textinnehållet samt false/true inom arrayen genom markTodoCompleted
        checkbox.addEventListener("change", () => {
            p.style.textDecoration = todo.completed ? "none" : "line-through";
            p.style.textDecorationThickness = "2px";
            todoList.markTodoCompleted(index);
            renderTodos();
        });

        // Tillger elementen inom DOM
        div.appendChild(checkbox);
        p.appendChild(span);
        div.appendChild(p);
        todoContainer.appendChild(div);
    })
}

/*function printSavedTodos(): void {
 TodoList.loadFromLocalStorage();
}*/

/**
 * För att ta bort felmeddelanden när användaren gör lyckad submit
 */
function removeErrorMsg(): void {
    const errorArea = document.getElementById("error-area") as HTMLUListElement;
    errorArea.innerHTML = "";
}
