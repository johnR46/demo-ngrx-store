import { createAction, props } from '@ngrx/store';
import { MODE } from '../constant/mode';
import { MenuId } from '../constant/menu-id';

export const CreateTodo = createAction(
  '[Todo] CreateTodo',
  props<{ featKey: MenuId }>()
);

export const CreateTodoSuccess = createAction(
  '[Todo] CreateTodoSuccess',
  props<{ featKey: MenuId; formValue: {} }>()
);

export const SearchTodoSuccess = createAction(
  '[Todo] SearchTodoSuccess',
  props<{ featKey: MenuId; criteria: {}; result: Array<Object> }>()
);

export const SearchTodoFailed = createAction(
  '[Todo] SearchTodoFailed',
  props<{ featKey: MenuId; criteria?: {} }>()
);

export const ResetTodo = createAction(
  '[Todo ResetTodo]',
  props<{ featKey: MenuId }>()
);

export const ViewTodo = createAction(
  '[Todo] ViewTodo',
  props<{ featKey: MenuId; formValue: {} }>()
);

export const UpdateTodo = createAction(
  '[Todo] UpdateTodo ',
  props<{ featKey: MenuId; activeIndex: number; formValue: {} }>()
);

export const UpdateTodoSuccess = createAction(
  '[Todo] UpdateTodoSuccess ',
  props<{ featKey: MenuId; formValue: {} }>()
);
