// Hämtar in klassen för todo-listan
import { TodoList } from './TodoList';

const todoList = new TodoList();


const form = document.getElementById("form") as HTMLFormElement;
const errMsg = document.getElementById("errContainer") as HTMLDivElement;

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        addTodo();
    });
}

function addTodo(): void {
    const task = (document.getElementById("todo-assign") as HTMLInputElement).value.trim();
    const priority = (document.getElementById("todo-priority") as HTMLInputElement).value.trim();
    const errors: string[] = [];

    if (!task && !priority) {
        console.log("Inga värden angivna")
        errors.push("Ange värden i sökfälten!")
        return;
    } if (task === "") {
        errors.push("Ange namn på uppgift!");
    }

    if (priority < 1 || priority > 3) {
        errors.push("Ange en prioritet mellan 1-3")
    }

    if (priority && task) {
        const newTodo = new TodoList(task, priority)
        todoList.addTodo(newTodo)
    }
}

function displayErrMsg(errors: string[]): void {
    if (errMsg === 0) return;
}

function renderTodos(): void {
    const todoList = document.getElementById("todo-list") as HTMLDivElement;
    todoList.innerHTML = ""; // Så att listan inte skapas flera gånger om

}

function printSavedTodos(): void {
    todoList.loadFromLocalStorage();
}