import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface TodoModel {
    id: string,
    title: string,
    isComplete: boolean
}

export interface TodoStateModel {
    items: TodoModel[];
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