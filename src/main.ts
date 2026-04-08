// Hämtar in klassen för todo-listan
import { TodoList } from './TodoList';

const todoList = new TodoList();


const form = document.getElementById("form") as HTMLFormElement;
const errContainer = document.getElementById("err-container") as HTMLDivElement;
const errorArea = document.getElementById("error-area") as HTMLUListElement;

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        addTodo();
    });
}

function addTodo(): void {
    const task = (document.getElementById("todo-assign") as HTMLInputElement).value.trim();
    const priority = Number((document.getElementById("todo-priority") as HTMLInputElement).value);
    const errors: string[] = [];
    if (task === "") {
        errors.push("Ange namn på uppgift!"); // Om användaren inte angett en uppgift att göra i textfältet
    }

    if (priority < 1 || priority > 3) { // Om användaren inte angett en prioritet mellan 1-3 i textfältet
        errors.push("Ange en prioritet mellan 1-3")
    }

    if (errors.length > 0) { // Om felmeddelanden finns så anropas funktionen för att visa errors
        displayErrMsg(errors);
        return;
    }


}

function displayErrMsg(errors: string[]): void {
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

function renderTodos(): void {
    const todoList = document.getElementById("todo-list") as HTMLDivElement;
    todoList.innerHTML = ""; // Så att listan inte skapas flera gånger om
}

function printSavedTodos(): void {
    todoList.loadFromLocalStorage();
}