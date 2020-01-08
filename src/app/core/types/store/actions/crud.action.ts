import { createAction, props } from '@ngrx/store';
import { CrudState } from '../type/crud-state';
import { ActiveIndex, SearchState } from '../type/search-state';

export const CreateTodo = createAction(
  '[Todo] Create',
  props<{ crudState: CrudState }>()
);

export const ViewTodo = createAction(
  '[Todo] View',
  props<{ crudState: CrudState }>()
);

export const UpdateTodo = createAction(
  '[Todo] Update',
  props<{ activeIndex: ActiveIndex; crudState: CrudState }>()
);

export const CreateTodoSuccess = createAction(
  '[Todo] CreateSuccess',
  props<{ searchState: SearchState }>()
);

export const UpdateTodoSuccess = createAction(
  '[Todo] UpdateSuccess',
  props<{ searchState: SearchState }>()
);

export const InactiveTodoSuccess = createAction(
  '[Todo]',
  props<{ crudState: CrudState }>()
);
