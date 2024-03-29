import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoCardComponent } from "./component/todo-card/todo-card.component";
import { TodoService } from './services/todo.service';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { GetTodos } from './ngxs/action/todo-action';
import { HeaderComponent } from './layouts/header/header.component';
import { TodoModalComponent } from './component/todo-modal/todo-modal.component';
import { ModalService } from './services/modal.service';
import { ModalState } from './ngxs/state/modal-state';
import { Observable } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ModalSelectors } from './ngxs/selectors/modal-selectors';
import { TodoSelectors } from './ngxs/selectors/todo-selector';
import { TodoModel } from './types';
import { TodoEditModalComponent } from './component/todo-edit-modal/todo-edit-modal.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TodoCardComponent, HeaderComponent, TodoModalComponent, NgIf, NgFor, TodoEditModalComponent],
})
export class AppComponent  {
  title = 'todo-client';
  modelActive = false
  modelActive$!: Observable<boolean>
  editModelActive = false
  editModelActive$!: Observable<{ show: boolean; todo?: TodoModel | undefined; }>
  constructor(private store: Store){
  }

  ngOnInit() {
    this.modelActive$ = this.store.select(ModalSelectors.modalActive);
    this.editModelActive$ = this.store.select(ModalSelectors.editModalState);
    this.editModelActive$.subscribe(active=> {
      this.editModelActive = active.show
    })
    this.modelActive$.subscribe(active => {
      this.modelActive = active
    })
    this.store.dispatch(new GetTodos)
  }
  
  AddItem() {
    console.log("clicked");

  }
}
