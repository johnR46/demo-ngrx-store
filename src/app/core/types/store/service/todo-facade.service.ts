import { Injectable } from '@angular/core';
import { AppState } from '../type/app-state';
import { Store } from '@ngrx/store';
import { CreateTodo, CreateTodoSuccess } from '../actions/todo.actions';

@Injectable({
  providedIn: 'root'
})
export class TodoFacadeService {
  constructor(private store: Store<AppState>) {}

  create(): void {
    this.store.dispatch(CreateTodo());
  }

  createSuccess(value?): void {
    this.store.dispatch(CreateTodoSuccess({ formValue: value }));
  }
}
