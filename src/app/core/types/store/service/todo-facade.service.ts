import { Injectable } from '@angular/core';
import { AppState } from '../type/app-state';
import { Store, select } from '@ngrx/store';
import {
  CreateTodo,
  CreateTodoSuccess,
  SearchTodoSuccess,
  ResetTodo,
  ViewTodo,
  UpdateTodo,
  UpdateTodoSuccess
} from '../actions/todo.actions';
import { Observable } from 'rxjs';
import { Todo } from '../../todo';
import { map } from 'rxjs/operators';
import { MODE } from '../constant/mode';
import { SearchCriteria } from '../../search-criteria';

@Injectable({
  providedIn: 'root'
})
export class TodoFacadeService {
  constructor(private store: Store<AppState>) {}

  getActiveIndex(): Observable<number> {
    return this.store.pipe(
      select('todo'),
      map(({ activeIndex }) => activeIndex)
    );
  }

  getCriteria(): Observable<SearchCriteria> {
    return this.store.pipe(
      select('todo'),
      map(({ criteria }) => criteria)
    );
  }

  getMode(): Observable<MODE> {
    return this.store.pipe(
      select('todo'),
      map(({ mode }) => mode)
    );
  }

  getResultSearch(): Observable<Todo[]> {
    return this.store.pipe(
      select('todo'),
      map(({ result }) => result)
    );
  }

  getFormValue(): Observable<Todo> {
    return this.store.pipe(
      select('todo'),
      map(({ formValue }) => formValue)
    );
  }

  create(): void {
    this.store.dispatch(CreateTodo());
  }

  createSuccess(value?): void {
    this.store.dispatch(CreateTodoSuccess({ formValue: value }));
  }

  searchSuccess(formCriteria, resultSearch): void {
    this.store.dispatch(
      SearchTodoSuccess({ criteria: formCriteria, result: resultSearch })
    );
  }

  resetSearchAndFormValueAndMode(): void {
    this.store.dispatch(ResetTodo());
  }

  viewFormValue(value): void {
    this.store.dispatch(ViewTodo({ formValue: value }));
  }

  upDateTodo(index, value): void {
    this.store.dispatch(UpdateTodo({ activeIndex: index, formValue: value }));
  }

  upDateTodoSuccess(value?): void {
    this.store.dispatch(UpdateTodoSuccess({ formValue: value }));
  }
}
