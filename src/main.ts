// Hämtar in klassen för todo-listan
import { TodoList } from './TodoList';

const todoList = new TodoList();

document.addEventListener("DOMContentLoaded", () => {
    renderTodos(); // Visar todos som finns lagrade i localstorage när sidan laddas in
    const form = document.getElementById("form") as HTMLFormElement;
    const clearBtn = document.getElementById("delete-button") as HTMLButtonElement;
    const sortBtn = document.getElementById("sort-button") as HTMLButtonElement;
    let sorted = false;

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            addTask();
        });
    }
    if (clearBtn) {
        clearBtn.addEventListener("click", (event) => {
            event.preventDefault();
            clearTodos();
        });
    }
    if (sortBtn) {
        sortBtn.addEventListener("click", (event) => {
            event.preventDefault();
            todoList.sortTodosByPriority();
            renderTodos();
            sorted = !sorted; // Om den är false blir den true och vice versa
            if (sorted) {
                todoList.sortTodosBackwardsByPriority();
                renderTodos();
            }
        });
    }
})

/**
 * För att lägga till en ny uppgift/todo
 * @returns - Funktionen returnerar ingenting
 */
function addTask(): void {

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

        if (!priority || priority > 3) { // Om användaren inte angett en siffra som prioritet mellan numren 1-3 i textfältet
            errors.push("Ange en prioritet mellan siffrorna 1-3")
        }
        displayErrMsg(errors);
        return;

    } if (newAddedTask) { // Om det lyckas med att skapa en ny todo
        taskInput.value = ""; // Nollställer textfälten
        priorityInput.value = "";
        removeErrorMsg(); // Tar bort eventuella felmeddelanden
        renderTodos(); // Anropar funktion för att skapa innehållet i DOM
    }
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
    const clearBtn = document.getElementById("delete-button") as HTMLButtonElement;

    todoContainer.innerHTML = ""; // Så att listan inte skapas flera gånger om
    const todos = todoList.getTodos(); // Hämtar in todos-arrayen från klassen

    todos.forEach((todo, index) => {
        // Skapar element
        const div = document.createElement("div") as HTMLDivElement;
        const p = document.createElement("p") as HTMLParagraphElement;
        const span = document.createElement("span") as HTMLSpanElement;
        const checkbox = document.createElement("input") as HTMLInputElement;

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

        if (todo.completed) {
            p.style.textDecoration = "line-through";
            p.style.textDecorationThickness = "2px";
        } else {
            p.style.textDecoration = "none";
        }

        // Vid klick på checkbox ändras textinnehållet samt false/true inom arrayen genom markTodoCompleted
        checkbox.addEventListener("change", () => {
            todoList.markTodoCompleted(index);
            renderTodos();
        });

        // Tillger elementen inom DOM
        div.appendChild(checkbox);
        p.appendChild(span);
        div.appendChild(p);
        todoContainer.appendChild(div);
    })

    if (todos.length > 0 && clearBtn) {
        clearBtn.classList.remove("hidden");
    } else clearBtn.classList.add("hidden");
}

/**
 * För att ta bort felmeddelanden när användaren gör lyckad submit
 */
function removeErrorMsg(): void {
    const errorArea = document.getElementById("error-area") as HTMLUListElement;
    errorArea.innerHTML = "";
}

function clearTodos(): void {
    const todoContainer = document.getElementById("todo-list") as HTMLDivElement;
    const clearBtn = document.getElementById("delete-button") as HTMLButtonElement;
    if (clearBtn) {
        alert("Vill du verkligen radera alla uppgifter?");
        localStorage.clear();
        todoList.clearTodos();
        todoContainer.innerHTML = "";
        clearBtn.classList.add("hidden"); // Knappen döljs när man raderar alla uppgifter
    }
}
