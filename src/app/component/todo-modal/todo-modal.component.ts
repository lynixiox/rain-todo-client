import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import {heroXMark} from "@ng-icons/heroicons/outline"
import { Store } from '@ngxs/store';
import { ToggleModalState } from '../../ngxs/action/modal-action';
import { AddItemAction } from '../../ngxs/action/todo-action';
@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [NgIconsModule],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.scss'
})
export class TodoModalComponent {
  constructor(private store: Store){}

  close() {
    this.store.dispatch(new ToggleModalState)
  }

  addItem(task: string){
    this.store.dispatch(new AddItemAction(task))
    this.store.dispatch(new ToggleModalState);
  }
}
