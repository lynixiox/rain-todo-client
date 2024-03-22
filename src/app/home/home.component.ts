import { Component, TemplateRef } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Store } from '@ngxs/store';
import { ToggleModalState } from '../ngxs/action/modal-action';
import { DashboardCardsComponent } from '../component/dashboard-cards/dashboard-cards.component';
import { TodoListComponent } from '../component/todo-list/todo-list.component';
import { BoardComponent } from '../component/board/board.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardCardsComponent, TodoListComponent, BoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private store: Store, public modalService: ModalService){}

  addTodo(){

  }
}
