import { createAction, props } from '@ngrx/store';
import { MODE } from '../constant/mode';

export const CreateTodo = createAction('[Todo] CreateTodo');

export const CreateTodoSuccess = createAction(
  '[Todo] CreateTodoSuccess',
  props<{ formValue: {} }>()
);

export const SearchTodoSuccess = createAction(
  '[Todo] SearchTodoSuccess',
  props<{ criteria: {}; result: [] }>()
);

export const SearchTodoFailed = createAction(
  '[Todo] SearchTodoFailed',
  props<{ criteria?: {} }>()
);

export const ResetTodo = createAction('[Todo ResetTodo]');

export const ViewTodo = createAction(
  '[Todo] ViewTodo',
  props<{ formValue: {} }>()
);

export const UpdateTodo = createAction(
  '[Todo] UpdateTodo ',
  props<{ activeIndex: number; formValue: {} }>()
);

export const UpdateTodoSuccess = createAction(
  '[Todo] UpdateTodoSuccess ',
  props<{ formValue: {} }>()
);
