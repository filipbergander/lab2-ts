// Importerar interfacet Todo
import { Todo } from './IfTodo';

export class addTodo implements Todo {
    task: string;
    completed: boolean;
    priority: number;

    constructor(task: string, completed: boolean, priority: number) {
        this.task = task;
        this.completed = completed;
        this.priority = priority;
    }
}