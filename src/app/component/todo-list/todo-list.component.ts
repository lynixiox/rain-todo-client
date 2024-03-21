import { Component } from '@angular/core';
import { TodoModel } from '../../types';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { TodoSelectors } from '../../ngxs/selectors/todo-selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos$!: Observable<TodoModel[]> 
  todos: TodoModel[] = [];

  constructor(private store : Store){}
  
  ngOnInit() {
    this.todos$ = this.store.select(TodoSelectors.todoItems);
    this.todos$.subscribe(active => {
      this.todos = active
    });
  }
}
