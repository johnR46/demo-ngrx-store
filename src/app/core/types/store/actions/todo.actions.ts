import { createAction, props } from '@ngrx/store';
import { MODE } from '../constant/mode';

export const CreateTodo = createAction(
  '[Todo] CreateTodo',
  props<{ featKey: string }>()
);

export const CreateTodoSuccess = createAction(
  '[Todo] CreateTodoSuccess',
  props<{ featKey: string; formValue: {} }>()
);

export const SearchTodoSuccess = createAction(
  '[Todo] SearchTodoSuccess',
  props<{ featKey: string; criteria: {}; result: [] }>()
);

export const SearchTodoFailed = createAction(
  '[Todo] SearchTodoFailed',
  props<{ featKey: string; criteria?: {} }>()
);

export const ResetTodo = createAction('[Todo ResetTodo]');

export const ViewTodo = createAction(
  '[Todo] ViewTodo',
  props<{ featKey: string; formValue: {} }>()
);

export const UpdateTodo = createAction(
  '[Todo] UpdateTodo ',
  props<{ featKey: string; activeIndex: number; formValue: {} }>()
);

export const UpdateTodoSuccess = createAction(
  '[Todo] UpdateTodoSuccess ',
  props<{ featKey: string; formValue: {} }>()
);
