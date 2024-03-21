import { Selector } from "@ngxs/store";
import { TodoState } from "../state/todo-state";
import { TodoModel, TodoStateModel } from "../../types";

export class TodoSelectors{ 
    @Selector([TodoState])
    static todoItems(state: TodoStateModel): TodoModel[]{
        return state.items
    }
}