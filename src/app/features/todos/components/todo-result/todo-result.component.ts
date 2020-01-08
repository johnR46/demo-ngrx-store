import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Todo } from 'src/app/core/types/todo';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/types/store/type/app-state';

@Component({
  selector: 'app-todo-result',
  templateUrl: './todo-result.component.html',
  styleUrls: ['./todo-result.component.scss']
})
export class TodoResultComponent implements OnInit {
  @Input() todos: Todo[] = [];

  @Output() view = new EventEmitter<{ todo: Todo; index: number }>();
  @Output() update = new EventEmitter<Todo>();

  constructor() {}

  ngOnInit() {
    console.log(this.todos);
  }
}
