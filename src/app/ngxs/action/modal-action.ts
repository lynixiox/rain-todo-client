import { TodoModel } from "../../types"

export class ToggleModalState {
    static readonly type = "[Modal] Change modal active status"
}

export class ToggleEditModalState{
    static readonly type = "[Edit Modal] Toggle Edit Modal"
    constructor(public todo?: TodoModel){}
}