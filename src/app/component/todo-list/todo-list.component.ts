import { Component } from '@angular/core';
import { TodoModel } from '../../types';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { TodoSelectors } from '../../ngxs/selectors/todo-selector';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from '../todo-card/todo-card.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

}
