export class AddItemAction {
    static readonly type = "[TODO page] Add item"
    constructor(public name: string){}
}

export class ToggleItemAction {
    static readonly type = "[TODO page] Change Item Complete Status"
    constructor(public name: string){}
}

export class GetTodos {
    static readonly type = "[TODO page] Get all Todos"
}