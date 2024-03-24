import { Injectable } from "@angular/core";
import { Action, State, StateContext, UpdateState, setValue } from "@ngxs/store";
import { TodoModel, TodoStateModel } from "../../types";
import { AddItemAction, GetTodos, SetActiveTodo, UpdateTask, UpdateTaskState, UpdateTaskStatus } from "../action/todo-action";
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
                id: uuidv4.toString(),
                title: "Create A Todo App",
                status: "TODO"
            }
        ],
        completed:[
            {
                id: uuidv4.toString(),
                title: "Create The Database",
                status: "IN_PROGRESS"
            }
        ],
        inProgress:[
            {
                id: uuidv4.toString(),
                title: "Create The Backend",
                status: "COMPLETED"
            }
        ],
        activeTodo: {
            id: "inactive",
            title: "",
            status: "TODO"
        }
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
    
    @Action(UpdateTask)
    updateTask(ctx: StateContext<TodoStateModel>, action: UpdateTask){
        let body ={ 
            "id": action.todo.id,
            "title": action.todo.title,
            "status": action.todo.status
        }
        this.http.put<TodoModel>(`http://localhost:8080/api/v1/todos/update/${action.todo.id}`, body).subscribe(data => {
            console.log(data)
        })
    }
    
    @Action(GetTodos)
    doGetTodos(ctx: StateContext<TodoStateModel>){
        return this.todoService.getTodos("http://localhost:8080/api/v1/todos/all", {page: 0, perPage: 10}).subscribe((todos)=> {
            const state = ctx.getState()
            let completed: TodoModel[] =[];
            let inProgress: TodoModel[]=[];
            let tempTodo: TodoModel[]=[];
            todos.forEach(todo => {
                if(todo.status==="COMPLETED"){
                    completed.push(todo);
                }else if(todo.status==="IN_PROGRESS"){
                    inProgress.push(todo)
                }else{
                    tempTodo.push(todo);
                }
            });
            ctx.setState({
                ...state,
                todo: tempTodo,
                inProgress: inProgress,
                completed: completed
            })
        }
        )
    }


}