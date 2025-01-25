import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { TodosService } from '../services/todos.service';
import { todo } from '../model/todo.type';
import { catchError, pipe } from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<todo>>([]);
  ngOnInit(): void {
    this.todoService
      .getTodosFromApi()
      .pipe(
        catchError((err) => {
          console.error('Error fetching todos:', err); // Improved error handling
          throw err; // Return an empty array to recover from the error
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos); // Update the signal with fetched todos
      });
  }

  updateTodoItem(todoItem: todo) {
    this.todoItems.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    });
  }
}
