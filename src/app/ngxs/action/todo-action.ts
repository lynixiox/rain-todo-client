import { TodoModel, TodoStateModel } from "../../types"

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

export class UpdateTaskStatus{
    static readonly type = "[TODO page] Update Status of Task"
    constructor(public id: string,public currentStatus: 'todo' | 'inProgress'| 'completed',  public newStatus: 'todo' | 'inProgress'| 'completed'){}

}


export class UpdateTaskState{
    static readonly type = "[TODO page] Update Status of Task"
    constructor(public newState: TodoStateModel){}

}