import { Injectable } from "@angular/core";
import { Action, State, StateContext, UpdateState, setValue } from "@ngxs/store";
import { TodoModel, TodoStateModel } from "../../types";
import { AddItemAction, GetTodos, SetActiveTodo, UpdateTaskState, UpdateTaskStatus } from "../action/todo-action";
import { TodoService } from "../../services/todo.service";
import { tap } from "rxjs";
import { response } from "express";
import { patch, updateItem } from "@ngxs/store/operators";
import { HttpClient } from "@angular/common/http";
import {v4 as uuidv4} from 'uuid';



@State<TodoStateModel>({
    name: "tasks",
    defaults: {
        todo:[
            {
                id: "int",
                title:"Create a Todo App",
                status: "TODO"
            }
        ],
        completed:[
            {
                id:"test1",
                title: "Create The Backend",
                status: "COMPLETED"
            }
        ],
        inProgress:[
            {
                id: "test2",
                title: "Create The Database",
                status: "IN_PROGRESS"
            }
        ],
    }
})
@Injectable()
export class TodoState {
    constructor(private todoService: TodoService, private http: HttpClient){}
    @Action(AddItemAction)
    addItem(ctx: StateContext<TodoStateModel>, action: AddItemAction) {
        
        const {name} = action
        const state = ctx.getState()
        const id = uuidv4();
        const todoItem: TodoModel = {
            id: id.toString(),
            status:'TODO',
            title: name
        }

        ctx.setState({
            ...state,
            todo: [...state.todo, todoItem]
        })

        let body = {
            "id": id.toString(),
            "title": name,
            "status": "TODO"
        }
        this.http.post<TodoModel>('http://localhost:8080/api/v1/todos/create', body).subscribe(data => {
            console.log(data)
        })
        
    }

    @Action(UpdateTaskStatus)
    updateTaskStatus(ctx: StateContext<TodoStateModel>, action: UpdateTaskStatus) {
        
        const {currentStatus} = action

        if(currentStatus == 'TODO'){
            ctx.setState(
                patch<TodoStateModel>({
                    todo: updateItem(
                        task => task.id === action.id,
                        patch({status: action.newStatus})
                    )
                })
            )
        }else if(currentStatus == 'IN_PROGRESS'){
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

    @Action(SetActiveTodo)
    setActiveTodo(ctx: StateContext<TodoStateModel>, action:SetActiveTodo) {
        
        const {activeTodo} = action

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