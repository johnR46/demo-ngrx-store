import { createReducer, on } from '@ngrx/store';
import { CreateTodo, CreateTodoSuccess } from '../actions/todo.actions';
import { MODE } from '../constant/mode';

const initialState = {
  criteria: {},
  result: [],
  mode: '',
  activeIndex: null,
  formValue: {}
};

// tslint:disable-next-line: variable-name
export const _todoReducer = createReducer(
  initialState,
  on(CreateTodo, state => {
    const oldState = state;
    return { ...oldState, mode: MODE.CREATE };
  }),
  on(CreateTodoSuccess, (state, formValue) => {
    const oldState = state;
    return { ...oldState, result: [...oldState.result, formValue] };
  })
);

export function toDoReducer(state, action) {
  return _todoReducer(state, action);
}
