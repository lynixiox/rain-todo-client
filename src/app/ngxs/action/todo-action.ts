import { TaskStatus, TodoModel, TodoStateModel } from "../../types"

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
    constructor(public id: string,public currentStatus: TaskStatus,  public newStatus:TaskStatus){}

}


export class UpdateTaskState{
    static readonly type = "[TODO page] Update Status of Task"
    constructor(public newState: TodoStateModel){}
}

export class UpdateTask{
    static readonly type = "[TODO PAGE] Update Task"
    constructor(public todo: TodoModel){}
}

export class SetActiveTodo{
    static readonly type = "[TODO page] Set active todo"
    constructor(public activeTodo: TodoModel){}
}

