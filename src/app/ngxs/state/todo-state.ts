import { Injectable } from "@angular/core";
import { Action, State, StateContext, UpdateState } from "@ngxs/store";
import { TodoModel, TodoStateModel } from "../../types";
import { AddItemAction, GetTodos, UpdateTaskState, UpdateTaskStatus } from "../action/todo-action";
import { TodoService } from "../../services/todo.service";
import { tap } from "rxjs";
import { response } from "express";
import { patch, updateItem } from "@ngxs/store/operators";

@State<TodoStateModel>({
    name: "tasks",
    defaults: {
        todo:[
            {
                id: "int",
                title:"Create a Todo App",
                status: "todo"
            }
        ],
        completed:[
            {
                id:"test1",
                title: "Create The Backend",
                status: "completed"
            }
        ],
        inProgress:[
            {
                id: "test2",
                title: "Create The Database",
                status: "inProgress"
            }
        ]
    }
})
@Injectable()
export class TodoState {
    constructor(private todoService: TodoService){}

    @Action(AddItemAction)
    addItem(ctx: StateContext<TodoStateModel>, action: AddItemAction) {
        
        const {name} = action

        const state = ctx.getState()
        const todoItem: TodoModel = {
            status:'todo',
            title: name
        }

        ctx.setState({
            ...state,
            todo: [...state.todo, todoItem]
        })
        
        console.log(ctx.getState());
    }

    @Action(UpdateTaskStatus)
    updateTaskStatus(ctx: StateContext<TodoStateModel>, action: UpdateTaskStatus) {
        
        const {currentStatus} = action

        if(currentStatus == 'todo'){
            ctx.setState(
                patch<TodoStateModel>({
                    todo: updateItem(
                        task => task.id === action.id,
                        patch({status: action.newStatus})
                    )
                })
            )
        }else if(currentStatus == 'inProgress'){
            ctx.setState(
                patch<TodoStateModel>({
                    inProgress: updateItem(
                        task => task.id === action.id,
                        patch({status: action.newStatus})
                    )
                })
            )
        }else{
            ctx.setState(
                patch<TodoStateModel>({
                    completed: updateItem(
                        task => task.id === action.id,
                        patch({status: action.newStatus})
                    )
                })
            )
        }

    }

    @Action(UpdateTaskState)
    updateTaskState(ctx: StateContext<TodoStateModel>, action:UpdateTaskState) {
        
        const {newState} = action
        ctx.setState({
            todo: newState.todo,
            completed: newState.completed,
            inProgress: newState.inProgress
        })
    }


    @Action(GetTodos)
    doGetTodos(ctx: StateContext<TodoStateModel>){
        return this.todoService.getTodos("http://localhost:8080/api/v1/todos/all", {page: 0, perPage: 10}).subscribe((todos)=> {
            const state = ctx.getState()

            ctx.setState({
                ...state,
                todo: todos,
            })
        }
        )
    }
    toggleItem(){

    }

}