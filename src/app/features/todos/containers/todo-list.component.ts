import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MODE } from 'src/app/core/types/store/constant/mode';
import { TodoFacadeService } from 'src/app/core/types/store/service/todo-facade.service';
import { Todo } from 'src/app/core/types/todo';
import { TodoItemFormComponent } from '../components/todo-item-form/todo-item-form.component';
import { TodoService } from '../services/todo.service';
import { MenuId } from 'src/app/core/types/store/constant/menu-id';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: []
})
export class TodoListComponent implements OnInit {
  @ViewChild(TodoItemFormComponent, { static: false })
  private child: TodoItemFormComponent;
  item$: Observable<Todo>;
  viewMode$: Observable<boolean>;
  updateMode$: Observable<boolean>;
  activeIndex: number;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoStore: TodoFacadeService // private todoStore: TodoFacadeService
  ) {}
  ngOnInit() {
    this.todoStore.getMode(MenuId.FEATONE).subscribe(v => console.log(v));

    // this.item$ = this.todoStore.getFormValue();
    this.item$ = this.todoStore.getFormValue(MenuId.FEATONE);
    this.viewMode$ = this.todoStore.getMode(MenuId.FEATONE).pipe(
      filter(v => v === 'VIEW'),
      map(() => true)
    );
    this.updateMode$ = this.todoStore.getMode(MenuId.FEATONE).pipe(
      filter(v => v === 'UPDATE'),
      map(() => true)
    );
    this.todoStore.getActiveIndex(MenuId.FEATONE).subscribe(v => {
      this.activeIndex = v;
    });
  }

  updateSuccess(formValue: Todo) {
    this.todoService.update(this.activeIndex, formValue).subscribe(result => {
      this.todoStore.upDateTodoSuccess(MenuId.FEATONE, formValue);
    });
    this.router.navigate([''], { relativeTo: this.activatedRoute });
  }

  save(value: Todo): void {
    this.todoService.create(value).subscribe(responCreate => {
      this.todoStore.createSuccess(MenuId.FEATONE, responCreate);
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
