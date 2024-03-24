import { Component } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { Store } from '@ngxs/store';
import { ToggleEditModalState, ToggleModalState } from '../../ngxs/action/modal-action';
import { AddItemAction, UpdateTask } from '../../ngxs/action/todo-action';
import { Observable } from 'rxjs';
import { ModalSelectors } from '../../ngxs/selectors/modal-selectors';
import { TaskStatus, TodoModel } from '../../types';

@Component({
  selector: 'app-todo-edit-modal',
  standalone: true,
  imports: [NgIconsModule],
  templateUrl: './todo-edit-modal.component.html',
  styleUrl: './todo-edit-modal.component.scss'
})
export class TodoEditModalComponent {
  constructor(private store: Store){}
  task$!: Observable<{ show: boolean; todo?: TodoModel | undefined;} >
  taskTitle: string | undefined =""
  id: string | undefined=""
  status: TaskStatus| undefined="TODO"
  ngOnInit(){
    this.task$=this.store.select(ModalSelectors.editModalState)
    this.task$.subscribe(task => {
      this.taskTitle = task.todo?.title
      this.id = task.todo?.id,
      this.status= task.todo?.status
    })
  }

  close() {
    this.store.dispatch(new ToggleEditModalState)
  }

  saveEdit(task: string){
    const updatedTask : TodoModel = {
      id: this.id!,
      title: task,
      status: this.status!
    }
    this.store.dispatch(new UpdateTask(updatedTask))
    this.store.dispatch(new ToggleEditModalState);
  }
}
