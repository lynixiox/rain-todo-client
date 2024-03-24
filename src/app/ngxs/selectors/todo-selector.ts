import { Selector } from "@ngxs/store";
import { TodoState } from "../state/todo-state";
import { TodoModel, TodoStateModel } from "../../types";

export class TodoSelectors{ 
    @Selector([TodoState])
    static todoItems(state: TodoStateModel): TodoModel[]{
        return state.todo
    }

    @Selector([TodoState])
    static completeItems(state: TodoStateModel): TodoModel[]{
        return state.completed
    }

    @Selector([TodoState])
    static inProgress(state: TodoStateModel): TodoModel[]{
        return state.inProgress
    }

    @Selector([TodoState])
    static activeTodo(state: TodoStateModel): TodoModel | undefined{
        return state.activeTodo
    }
}