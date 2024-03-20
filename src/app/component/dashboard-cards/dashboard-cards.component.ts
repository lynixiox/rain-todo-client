import { Component } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [TodoCardComponent],
  templateUrl: './dashboard-cards.component.html',
  styleUrl: './dashboard-cards.component.scss'
})
export class DashboardCardsComponent {
   todos= []
}
