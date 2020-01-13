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
import { PrePareStore } from '../model/prepare-store';

@Injectable({
  providedIn: 'root'
})
export class TodoFacadeService {
  constructor(private store: Store<AppState>) {}

  // getActiveIndex(): Observable<number> {
  //   return this.store.pipe(
  //     select('todo'),
  //     map(({ activeIndex }) => activeIndex)
  //   );
  // }

  // getCriteria(): Observable<SearchCriteria> {
  //   return this.store.pipe(
  //     select('todo'),
  //     map(({ criteria }) => criteria)
  //   );
  // }

  // getMode(): Observable<MODE> {
  //   return this.store.pipe(
  //     select('todo'),
  //     map(({ mode }) => mode)
  //   );
  // }

  getResultSearch(featKey: MenuId): Observable<Todo[] | any> {
    return this.store.pipe(
      select('todo'),
      map(Value =>
        Object.keys(Value)
          .map(key => {
            if (Value[key].getFeatMenu() === featKey) {
              return Value[key];
            }
          })
          .filter(noValue => noValue)
      ),
      map(result => result[0].getResult())
    );
  }

  // getFormValue(): Observable<Todo> {
  //   return this.store.pipe(
  //     select('todo'),
  //     map(({ formValue }) => formValue)
  //   );
  // }

  create(menu: string): void {
    this.store.dispatch(CreateTodo({ featKey: menu }));
  }

  createSuccess(menu: string, value?): void {
    this.store.dispatch(CreateTodoSuccess({ featKey: menu, formValue: value }));
  }

  // searchSuccess(formCriteria, resultSearch): void {
  //   this.store.dispatch(
  //     SearchTodoSuccess({ criteria: formCriteria, result: resultSearch })
  //   );
  // }

  // searchFailed(cri?): void {
  //   this.store.dispatch(SearchTodoFailed({ criteria: cri }));
  // }

  // resetSearchAndFormValueAndMode(): void {
  //   this.store.dispatch(ResetTodo());
  // }

  // viewFormValue(value): void {
  //   this.store.dispatch(ViewTodo({ formValue: value }));
  // }

  // upDateTodo(index, value): void {
  //   this.store.dispatch(UpdateTodo({ activeIndex: index, formValue: value }));
  // }

  // upDateTodoSuccess(value?): void {
  //   this.store.dispatch(UpdateTodoSuccess({ formValue: value }));
  // }
}
