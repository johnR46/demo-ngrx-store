import { Component, OnInit } from '@angular/core';
import { SearchCriteria } from 'src/app/core/types/search-criteria';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Todo } from 'src/app/core/types/todo';
import { TodoService } from '../services/todo.service';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/types/store/type/app-state';
import {
  CreateTodo,
  ViewTodo,
  UpdateTodo
} from 'src/app/core/types/store/actions/crud.action';
import {
  searchTodo,
  resetSearchTodo
} from 'src/app/core/types/store/actions/search.action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private todoService: TodoService
  ) {}

  todos$: Observable<any>;
  criteria$: Observable<any>;

  ngOnInit() {
    this.todos$ = this.store
      .select('search')
      .pipe(map(val => val.result.value || []));

    this.criteria$ = this.store
      .select('search')
      .pipe(map(v => v.criteria || ''));

    this.criteria$.subscribe(v => console.log(v));
  }

  onSearch(formCriteria: SearchCriteria): void {
    this.todoService.search(formCriteria).subscribe((result: Todo[]) => {
      this.store.dispatch(
        searchTodo({
          searchState: {
            criteria: { value: formCriteria },
            result: { value: result },
            activeIndex: null
          }
        })
      );
    });
  }

  onClear(): void {
    this.store.dispatch(
      resetSearchTodo({
        searchState: {
          criteria: { value: '' },
          result: { value: null },
          activeIndex: { value: null }
        }
      })
    );
    console.log('clear');
  }

  goToCreatePage(): void {
    this.store.dispatch(
      CreateTodo({ crudState: { formValue: null, mode: 'CREATE' } })
    );
    this.router.navigate(['./create'], { relativeTo: this.activatedRoute });
  }

  toView(viewValue: Todo): void {
    this.store.dispatch(
      ViewTodo({ crudState: { formValue: { value: viewValue }, mode: 'VIEW' } })
    );
    this.router.navigate(['./view'], { relativeTo: this.activatedRoute });
  }

  toUpdate(val): void {
    const { index, todo } = val;
    console.log(index);

    this.store.dispatch(
      UpdateTodo({
        crudState: { formValue: { value: todo }, mode: 'UPDATE' },
        activeIndex: index
      })
    );

    this.router.navigate(['./update'], { relativeTo: this.activatedRoute });
  }
}
