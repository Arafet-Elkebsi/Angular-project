import { Component } from '@angular/core';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {}
