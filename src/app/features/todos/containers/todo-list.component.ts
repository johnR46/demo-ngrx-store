import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/types/todo';
import { AppState } from 'src/app/core/types/store/type/app-state';
import { map, tap } from 'rxjs/operators';
import { TodoItemFormComponent } from '../components/todo-item-form/todo-item-form.component';
import { TodoService } from '../services/todo.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UpdateTodoSuccess,
  CreateTodoSuccess
} from 'src/app/core/types/store/actions/crud.action';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: []
})
export class TodoListComponent implements OnInit {
  @ViewChild(TodoItemFormComponent, { static: false })
  private child: TodoItemFormComponent;
  item$: Observable<any>;
  viewMode$: Observable<boolean>;
  updateMode$: Observable<boolean>;
  // updateMode$: Observable<boolean>;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.item$ = this.store.select('crud').pipe(map(val => val.formValue));
    this.viewMode$ = this.store
      .select('crud')
      .pipe(map(v => v.mode === 'VIEW'));

    this.updateMode$ = this.store
      .select('crud')
      .pipe(map(v => v.mode === 'UPDATE'));
  }

  update(valueValue: Todo) {
    this.todoService.update(valueValue).subscribe(result => {
      this.store.dispatch(
        UpdateTodoSuccess({ searchState: { result: { value: [result] } } })
      );
    });
    this.router.navigate([''], { relativeTo: this.activatedRoute });
  }

  save(value: Todo): void {
    this.todoService.create(value).subscribe(responCreate => {
      this.store.dispatch(
        CreateTodoSuccess({
          searchState: { result: { value: [responCreate] } }
        })
      );

      this.router.navigate([''], { relativeTo: this.activatedRoute });
    });
  }

  trickChild(): void {
    this.child.processCreateOrUpdateOrInactive();
  }

  closePage(): void {
    this.router.navigate([''], { relativeTo: this.activatedRoute });
  }
}
