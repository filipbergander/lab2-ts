// Interface för objekt som visar en todo (uppgift att göra)
export interface Todo {
    task: string;
    completed: boolean;
    priority: number;
}