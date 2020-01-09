import { createAction, props } from '@ngrx/store';
import { MODE } from '../constant/mode';

export const CreateTodo = createAction('[Todo] CreateTodo');

export const CreateTodoSuccess = createAction(
  '[Todo] CreateTodoSuccess',
  props<{ formValue: {} }>()
);
