// Hämtar in klassen för todo-listan
import { TodoList } from './TodoList';

const todoList = new TodoList(); // Instans av klassen för att använda metoder som finns där

let sorted = false; // För att kunna sortera todos efter prioritet
let rotate = 0; // För att rotera ikonen på sortera knappen när man klickar på den

// Element inom HTML
const form = document.getElementById("form") as HTMLFormElement;
const clearBtn = document.getElementById("delete-button") as HTMLButtonElement;
const sortBtn = document.getElementById("sort-button") as HTMLButtonElement;
const sortIcon = document.getElementById("sort-icon") as HTMLElement;


document.addEventListener("DOMContentLoaded", () => {

    renderTodos(); // Visar todos som finns lagrade i localstorage när sidan laddas in

    if (form) {// När formuläret submittas skapas en ny todo
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            addTask(); // Lägger till ny todo
        });
    }

    // Vid klick på radera-knappen för uppgifter så raderas alla todos
    if (clearBtn) {
        clearBtn.addEventListener("click", (event) => {
            event.preventDefault();
            clearTodos(); // Tömmer listan på alla todos
            removeErrorMsg() // Tömmer eventuella felmeddelanden
        });
    }
    //if (!sortBtn.classList.contains("hidden"))
        // Sortera-knapp efter prioritet på todos
        if (sortBtn && sortIcon) {
            sortBtn.addEventListener("click", (event) => {
                event.preventDefault();
                rotate += 180; // För att rotera ikonen på knappen
                sortIcon.style.transform = `rotate(${rotate}deg)`; // För att rotera ikonen på knappen
                todoList.sortTodosByPriorityAsc(); // Sorterar efter prioritet
                renderTodos();
                sorted = !sorted; // Om den är false blir den true och vice versa
                if (sorted) {
                    todoList.sortTodosByPriorityDesc(); // Sorterar prioriteten baklänges
                    renderTodos();
                }
            });
        }
});

/**
 * För att lägga till en ny uppgift/todo
 * @returns - Funktionen returnerar ingenting
 */
function addTask(): void {
    // Inputfälten inom formuläret
    const taskInput = document.getElementById("todo-assign") as HTMLInputElement;
    const priorityInput = document.getElementById("todo-priority") as HTMLInputElement;

    // Värdena inom inputfälten som anges av användaren
    const task: string = taskInput.value.trim();
    const priority: number = Number(priorityInput.value);

    // Skapar en ny todo enligt metoden inom klassen
    const newAddedTask = todoList.addTodo(task, priority);
    const errors: string[] = []; // En array för felmeddelanden

    if (!newAddedTask) { // Om det misslyckades med att skapa en ny todo ges felmeddelanden

        if (!task) {
            errors.push("Ange namn på uppgift!"); // Om användaren inte angett en uppgift att göra i textfältet
        }

        if (!priority || priority > 3) { // Om användaren inte angett en siffra som prioritet mellan numren 1-3 i textfältet
            errors.push("Ange en prioritet mellan siffrorna 1-3")
        }

        if (todoList.getTodos().find(todo => todo.task === task)) { // Om användaren försöker skapa en uppgift som redan finns
            errors.push("Du lagrar redan uppgiften!"); // Om användaren försöker skapa en uppgift som redan finns
        }
        displayErrMsg(errors); // Visar felmeddelanden
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

    todoContainer.innerHTML = ""; // Så att listan inte skapas flera gånger om
    const todos = todoList.getTodos(); // Hämtar in todos-arrayen från klassen
    displayButtons();
    todos.forEach((todo, index) => {

        // Skapar element
        const div = document.createElement("div") as HTMLDivElement;
        const p = document.createElement("p") as HTMLParagraphElement;
        const span = document.createElement("span") as HTMLSpanElement;
        const checkbox = document.createElement("input") as HTMLInputElement;
        const removeIcon = document.createElement("button") as HTMLButtonElement;

        // Ger element klasser och typer för styling
        div.className = "todo-task";
        p.className = "p-todo";
        span.className = "span-todo";
        checkbox.type = "checkbox";
        removeIcon.className = "material-icons";
        removeIcon.textContent = "delete";
        removeIcon.setAttribute("aria-label", "Radera uppgiften");
        removeIcon.setAttribute("data-index", index.toString()); //Ger data-index till varje delete ikon

        if (removeIcon) {
            removeIcon.addEventListener("click", (event) => {
                event.preventDefault();
                todoList.removeTodo(index);
                renderTodos();
                if (todoList.getTodos().length < 1) {
                    hideButtons();
                }
            });
        }
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
        div.appendChild(removeIcon);
        todoContainer.appendChild(div);
    })
}

/**
 * För att ta bort felmeddelanden när användaren gör lyckad submit
 */
function removeErrorMsg(): void {
    const errorArea = document.getElementById("error-area") as HTMLUListElement;
    errorArea.innerHTML = "";
}

/**
 * För att radera alla uppgifter inom listan av todos
 */
function clearTodos(): void {
    // Element inom HTML
    const todoContainer = document.getElementById("todo-list") as HTMLDivElement;
    const clearBtn = document.getElementById("delete-button") as HTMLButtonElement;
    const sortBtn = document.getElementById("sort-button") as HTMLButtonElement;

    if (clearBtn) {
        const confirmClear = confirm("Vill du verkligen radera alla uppgifter?"); // Confirm för att radera alla todos
        if (!confirmClear) return; // Om man inte klickar på OK så körs inte resten av funktionen
        todoList.clearTodos(); // Tömmer arrayen
        todoContainer.innerHTML = ""; // Tömmer DOM på innehållet
        sortBtn.classList.add("hidden"); // Sortera-knappen döljs
        clearBtn.classList.add("hidden"); // Knappen döljs när man raderar alla uppgifter
    }
}

/**
 * Visar knappar som finns inom DOM genom att ta bort deras klass hidden
 */
function displayButtons(): void {
    // Visar knappen för att sortera (prioritet), och för att radera alla todos om det finns mer än 1 lagrad todo
    if (todoList.getTodos().length > 1 && sortBtn && clearBtn) {
        sortBtn.classList.remove("hidden");
        clearBtn.classList.remove("hidden");
    }
}

function hideButtons(): void {
    if (todoList.getTodos().length <= 0) {
        sortBtn.classList.add("hidden"); // Sortera-knappen döljs
        clearBtn.classList.add("hidden"); // Knappen döljs när man raderar alla uppgifter
    }
}