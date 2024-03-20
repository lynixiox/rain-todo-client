import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { TodoModel, TodoStateModel } from "../../types";
import { AddItemAction } from "../action/todo-action";
import { TodoService } from "../../services/todo.service";

@State<TodoStateModel>({
    name: "todo",
    defaults: {
        items:[],
    }
})
@Injectable()
export class TodoState {
    constructor(private todoService: TodoService){

    }

    @Action(AddItemAction)
    addItem(ctx: StateContext<TodoStateModel>, action: AddItemAction) {
        
        const {name} = action
        if(!name){
            return
        }

        const state = ctx.getState()
        const todoItem: TodoModel = {
            id: "test",
            isComplete: false,
            title: name
        }

        ctx.setState({
            ...state,
            items: [...state.items, todoItem]
        })

        console.log(ctx.getState());
    }

    toggleItem(){

    }

}