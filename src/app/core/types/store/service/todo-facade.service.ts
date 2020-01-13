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
  UpdateTodoSuccess,
  SearchTodoFailed
} from '../actions/todo.actions';
import { Observable, of, pipe } from 'rxjs';
import { Todo } from '../../todo';
import { map, filter, tap } from 'rxjs/operators';
import { MODE } from '../constant/mode';
import { SearchCriteria } from '../../search-criteria';
import { MenuId } from '../constant/menu-id';
import { TodoStore } from '../type/todo-store';

@Injectable({
  providedIn: 'root'
})
export class TodoFacadeService {
  stores$: Observable<{ store: TodoStore[] }>;
  constructor(private store: Store<AppState>) {
    this.stores$ = store.pipe(select('todo'));
  }

  getActiveIndex(featKey: MenuId): Observable<number> {
    return this.stores$.pipe(
      map(value =>
        Object.keys(value)
          .map(key => value[key][featKey])
          .filter(noMatch => noMatch)
          .map(result => result.getActiveIndex())
          .reduce(index => index)
      )
    );
  }

  getFormValue(featKey: MenuId): Observable<Todo> {
    return this.stores$.pipe(
      map(value =>
        Object.keys(value)
          .map(key => value[key][featKey])
          .filter(noMatch => noMatch)
          .map(result => result.getFormValue())
          .reduce(formValue => formValue)
      )
    );
  }

  getCriteria(featKey: MenuId): Observable<SearchCriteria> {
    return this.stores$.pipe(
      map(value =>
        Object.keys(value)
          .map(key => value[key][featKey])
          .filter(noMatch => noMatch)
          .map(result => result.getCriteria())
          .reduce(criteria => criteria)
      ),
      tap(v => console.log(v))
    );
  }

  getMode(featKey: MenuId): Observable<MODE> {
    return this.stores$.pipe(
      map(value =>
        Object.keys(value)
          .map(key => value[key][featKey])
          .filter(noMatch => noMatch)
          .map(mode => mode.getMode())
          .reduce(v => v)
      )
    );
  }

  getResultSearch(featKey: MenuId): Observable<Todo[] | any> {
    return this.stores$.pipe(
      map(value =>
        Object.keys(value)
          .map(key => value[key][featKey])
          .filter(noMatch => noMatch)
          .map(result => result.getResult())
          .reduce((prv, cur) => [...prv, ...cur], [])
      )
    );
  }

  create(menu: MenuId): void {
    this.store.dispatch(CreateTodo({ featKey: menu }));
  }

  createSuccess(menu: MenuId, value?): void {
    this.store.dispatch(CreateTodoSuccess({ featKey: menu, formValue: value }));
  }

  searchSuccess(menu: MenuId, formCriteria, resultSearch: Array<Object>): void {
    this.store.dispatch(
      SearchTodoSuccess({
        featKey: menu,
        criteria: formCriteria,
        result: resultSearch
      })
    );
  }

  searchFailed(key: MenuId, cri?: Object): void {
    this.store.dispatch(SearchTodoFailed({ featKey: key, criteria: cri }));
  }

  resetSearchAndFormValueAndMode(key: MenuId): void {
    this.store.dispatch(ResetTodo({ featKey: key }));
  }

  viewFormValue(menu: MenuId, value: Object): void {
    this.store.dispatch(ViewTodo({ featKey: menu, formValue: value }));
  }

  upDateTodo(menu: MenuId, index: number, value): void {
    this.store.dispatch(
      UpdateTodo({ featKey: menu, activeIndex: index, formValue: value })
    );
  }

  upDateTodoSuccess(menu: MenuId, value?): void {
    this.store.dispatch(UpdateTodoSuccess({ featKey: menu, formValue: value }));
  }
}
