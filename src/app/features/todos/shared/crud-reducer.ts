import { createReducer, on } from '@ngrx/store';
import { Create, Reset, Update, View } from './crud.actions';

export const initialStateFormVal = {};

const _crudReducer = createReducer(
  initialStateFormVal,
  on(Create, (state, { key, data }) => {
    return state;
  })
);
export function crudReducer(state, action) {
  return _crudReducer(state, action);
}
