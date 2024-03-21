import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoCardComponent } from "./component/todo-card/todo-card.component";
import { TodoService } from './services/todo.service';
import { NgxsModule, Store } from '@ngxs/store';
import { GetTodos } from './ngxs/action/todo-action';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TodoCardComponent],
})
export class AppComponent {
  title = 'todo-client';

  constructor(private store: Store){}

  ngOnInit() {
    this.store.dispatch(new GetTodos)
  }
  
  AddItem() {
    console.log("clicked");
  }
}
