import { Component } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoModel } from '../../types';
import { TodoSelectors } from '../../ngxs/selectors/todo-selector';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [TodoCardComponent],
  templateUrl: './dashboard-cards.component.html',
  styleUrl: './dashboard-cards.component.scss'
})
export class DashboardCardsComponent {
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
