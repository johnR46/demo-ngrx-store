import { createReducer, on } from '@ngrx/store';
import { CrudState } from '../type/crud-state';
import {
  CreateTodo,
  ViewTodo,
  UpdateTodo,
  CreateTodoSuccess
} from '../actions/crud.action';

const initialStateCrud: CrudState = { formValue: null, mode: null };

export const _crudReducer = createReducer(
  initialStateCrud,
  on(CreateTodo, (state, { crudState }) => {
    const featState = state;

    return Object.assign({}, { ...featState, ...crudState });
  }),

  on(ViewTodo, (state, { crudState }) => {
    const featState = state;
    return Object.assign({}, { ...featState, ...crudState });
  }),
  on(UpdateTodo, (state, { activeIndex, crudState }) => {
    const featState = state;
    return Object.assign({}, { ...featState, ...crudState, activeIndex });
  })
);

export function CrudReducer(state, action) {
  return _crudReducer(state, action);
}
