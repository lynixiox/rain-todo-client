import { NgModule } from "@angular/core";
import { NgxsModule, provideStore } from "@ngxs/store";
import { environment } from "../environments/environment";
import { TodoState } from "./ngxs/state/todo-state";
import { PluginManager } from "@ngxs/store/src/plugin-manager";
import { CommonModule } from "@angular/common";

@NgModule({
    providers:[],
    imports: [NgxsModule.forRoot()],
})

export class AppModule{}