import { TodoModel } from "../types";

export class Column {
    constructor(public name: string, public tasks: TodoModel[]) {}
}