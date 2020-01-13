import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchCriteria } from 'src/app/core/types/search-criteria';
// import { TodoFacadeService } from 'src/app/core/types/store/service/todo-facade.service';
import { Todo } from 'src/app/core/types/todo';
import { TodoService } from '../services/todo.service';
import { TodoFacadeService } from 'src/app/core/types/store/service/todo-facade.service';
import { MenuId } from 'src/app/core/types/store/constant/menu-id';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private todoStore: TodoFacadeService
  ) {}

  todos$: Observable<any>;
  criteria$: Observable<SearchCriteria>;

  ngOnInit() {
    this.todoStore
      .getResultSearch(MenuId.FEATONE)
      .subscribe(v => console.log(v));
    // this.criteria$ = this.todoStore.getCriteria();
  }

  onSearch(formCriteria: SearchCriteria): void {
    this.todoService.search(formCriteria).subscribe(
      (result: Todo[]) => {
        console.log('resultSearch : ', result);

        // this.todoStore.searchSuccess(formCriteria, result);
      },
      () => {
        // this.todoStore.searchFailed(formCriteria);
      }
    );
  }

  onClear(): void {
    // this.todoStore.resetSearchAndFormValueAndMode();
    console.log('clear');
  }

  goToCreatePage(): void {
    this.todoStore.create(MenuId.FEATONE);
    this.router.navigate(['./create'], { relativeTo: this.activatedRoute });
  }

  toView(viewValue: Todo): void {
    // this.todoStore.viewFormValue(viewValue);
    this.router.navigate(['./view'], { relativeTo: this.activatedRoute });
  }

  toUpdate(val): void {
    const { index, todo } = val;
    // this.todoStore.upDateTodo(index, todo);
    this.router.navigate(['./update'], { relativeTo: this.activatedRoute });
  }
}
