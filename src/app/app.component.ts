import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoCardComponent } from "./component/todo-card/todo-card.component";
import { TodoService } from './services/todo.service';
import { Store } from '@ngxs/store';

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

  
  AddItem() {
    console.log("clicked");
  }
}
