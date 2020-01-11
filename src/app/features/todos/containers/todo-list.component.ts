import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MODE } from 'src/app/core/types/store/constant/mode';
import { TodoFacadeService } from 'src/app/core/types/store/service/todo-facade.service';
import { Todo } from 'src/app/core/types/todo';
import { TodoItemFormComponent } from '../components/todo-item-form/todo-item-form.component';
import { TodoService } from '../services/todo.service';

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
  // updateMode$: Observable<boolean>;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoStore: TodoFacadeService
  ) {}
  ngOnInit() {
    this.item$ = this.todoStore.getFormValue();

    this.viewMode$ = this.todoStore.getMode().pipe(
      filter(v => v === MODE.VIEW),
      map(() => true)
    );

    this.updateMode$ = this.todoStore.getMode().pipe(
      filter(v => v === MODE.UPDATE),
      map(() => true)
    );
    this.todoStore.getActiveIndex().subscribe(v => {
      this.activeIndex = v;
    });
  }

  updateSuccess(valueValue: Todo) {
    this.todoService.update(this.activeIndex, valueValue).subscribe(result => {
      this.todoStore.upDateTodoSuccess(valueValue);
    });
    this.router.navigate([''], { relativeTo: this.activatedRoute });
  }

  save(value: Todo): void {
    this.todoService.create(value).subscribe(responCreate => {
      this.todoStore.createSuccess(responCreate);
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
