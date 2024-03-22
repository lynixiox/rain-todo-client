import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from '../../types';
import { Store } from '@ngxs/store';
import { TodoSelectors } from '../../ngxs/selectors/todo-selector';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import {DragDropModule} from "@angular/cdk/drag-drop"
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { ToggleModalState } from '../../ngxs/action/modal-action';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, TodoCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  todos$!: Observable<TodoModel[]> 
  todos: TodoModel[]= [{id:"nothing", isComplete: false, title: "test"}];
  inProgress: TodoModel[]= [{id:"nothing", isComplete: false, title: "test"}];


  constructor(private store : Store){}

  board: Board = new Board('Test Board', [
    new Column('Ideas',this.todos),
    new Column('Research',[]),
    new Column('Todo', []),
    new Column('Done', [])
  ]);

  ngOnInit() {
    this.todos$ = this.store.select(TodoSelectors.todoItems);
    this.todos$.subscribe(todoList => {
      this.todos = todoList
    });

    
  }

  addTodo(){
    this.store.dispatch(new ToggleModalState)
  }

  drop(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
