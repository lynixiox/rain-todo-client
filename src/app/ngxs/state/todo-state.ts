import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { TodoModel, TodoStateModel } from "../../types";
import { AddItemAction, GetTodos } from "../action/todo-action";
import { TodoService } from "../../services/todo.service";
import { tap } from "rxjs";
import { response } from "express";

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

    @Action(GetTodos)
    doGetTodos(ctx: StateContext<TodoStateModel>){
        return this.todoService.getTodos("http://localhost:8080/api/v1/todos/all", {page: 0, perPage: 10}).subscribe((todo)=> {
            const state = ctx.getState()
            ctx.setState({
                ...state,
                items: todo    
            })
            console.log(ctx.getState());
        }
        )
    }
    toggleItem(){

    }

}