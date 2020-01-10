import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from 'src/app/core/types/todo';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-item-form',
  templateUrl: './todo-item-form.component.html',
  styleUrls: ['./todo-item-form.component.scss']
})
export class TodoItemFormComponent implements OnInit {
  @Input() todoValue: Todo;
  @Input() viewMode: boolean;
  @Input() updateMode: boolean;

  @Output() save = new EventEmitter<Todo>();
  @Output() update = new EventEmitter<Todo>();

  todoForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  private buildForm() {
    this.todoForm = this.fb.group({
      code: undefined,
      name: undefined,
      type: undefined
    });
  }

  processCreateOrUpdateOrInactive(): void {
    if (this.updateMode) {
      this.onUpdate();
    } else {
      this.onSave();
    }
  }

  onUpdate(): void {
    console.log('onUpdate');

    this.update.emit(this.todoFormValue);
  }

  onSave(): void {
    console.log('onSave');

    this.save.emit(this.todoFormValue);
  }

  get todoFormValue(): Todo {
    return this.todoForm.getRawValue();
  }

  ngOnInit() {
    if (this.viewMode) {
      this.todoForm.disable();
    }
    this.todoForm.patchValue(this.todoValue || {});
  }
}
