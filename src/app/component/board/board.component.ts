import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel, TodoStateModel } from '../../types';
import { Store } from '@ngxs/store';
import { TodoSelectors } from '../../ngxs/selectors/todo-selector';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDragMove, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {DragDropModule} from "@angular/cdk/drag-drop"
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { ToggleModalState } from '../../ngxs/action/modal-action';
import { UpdateTaskState, UpdateTaskStatus } from '../../ngxs/action/todo-action';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, TodoCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  todos$!: Observable<TodoModel[]> 
  completed$!: Observable<TodoModel[]>
  inProgress$!: Observable<TodoModel[]>
  completed: TodoModel[]=[];
  todos: TodoModel[]= [];
  inProgress: TodoModel[]= [];


  constructor(private store : Store){}

  ngOnInit() {
    this.todos$ = this.store.select(TodoSelectors.todoItems);
    this.completed$ = this.store.select(TodoSelectors.completeItems);
    this.inProgress$ = this.store.select(TodoSelectors.inProgress)
    this.todos$.subscribe(todoList => {
      this.todos = todoList
    });

    this.completed$.subscribe(completedList => {
      this.completed = completedList;
    })

    this.inProgress$.subscribe(inProgressList => {
      this.inProgress = inProgressList;
    })

    
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
        this.todos.forEach(todo => {
            todo.status="todo"
        });
        this.completed.forEach(complete => {
          complete.status="completed"
        });
        this.inProgress.forEach(inProgress=>{
          inProgress.status="inProgress"
        })
        const newState: TodoStateModel = {
          todo: this.todos,
          completed: this.completed,
          inProgress: this.inProgress
        }
      this.store.dispatch(new UpdateTaskState(newState))

    }
  }

}
