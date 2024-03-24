import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface TodoModel {
    id: string,
    title: string,
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
}

export interface TodoStateModel {
    todo: TodoModel[];
    inProgress: TodoModel[];
    completed: TodoModel[];
    activeTodo?: TodoModel;
}

export interface Options {
    headers? : HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param:string] : string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface PaginationParams {
    [param: string]: |string | number| boolean| ReadonlyArray<string | number| boolean>
    page: number;
    perPage: number
}


export interface ModalStateModel{
    showModal: boolean
}

export interface ModalModel{
    showModel: boolean
}

export interface CreateTaskBody{
    "title": string;
    "status": string;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
