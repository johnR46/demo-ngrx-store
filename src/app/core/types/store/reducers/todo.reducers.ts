import { createReducer, on } from '@ngrx/store';
import {
  CreateTodo,
  CreateTodoSuccess,
  SearchTodoSuccess,
  ResetTodo,
  ViewTodo,
  UpdateTodo,
  UpdateTodoSuccess,
  SearchTodoFailed
} from '../actions/todo.actions';
import { MODE } from '../constant/mode';

const initialState = {
  criteria: {},
  result: [],
  mode: '',
  activeIndex: -1,
  formValue: {}
};

/*

on(ActionA,ActionB,state => {   เกิด A   หรีอ  B  จะทำ  reducer เดียวกัน
  return Obj.assign({},{...state})
})


*/

export const todoReducer = createReducer(
  initialState,
  on(CreateTodo, oldState => {
    return Object.assign(
      {},
      { ...oldState, formValue: {}, activeIndex: -1, mode: MODE.CREATE }
    );
  }),
  on(CreateTodoSuccess, (oldState, { formValue }) => {
    return Object.assign(
      {},
      { ...oldState, result: [...oldState.result, formValue] }
    );
  }),
  on(SearchTodoSuccess, (oldState, { criteria, result }) => {
    return Object.assign(
      {},
      {
        ...oldState,
        criteria,
        result: [...result]
      }
    );
  }),
  on(SearchTodoFailed, (oldState, { criteria: cc }) => {
    return Object.assign(
      {},
      { ...oldState, activeIndex: null, criteria: cc, result: [] }
    );
  }),
  on(ResetTodo, oldState => {
    return Object.assign({}, { ...oldState, ...initialState });
  }),
  on(ViewTodo, (state, { formValue }) => {
    const oldState = state;
    return Object.assign(
      {},
      { ...oldState, mode: MODE.VIEW, formValue: { ...formValue } }
    );
  }),
  on(UpdateTodo, (oldState, { activeIndex: index, formValue }) => {
    return Object.assign(
      {},
      {
        ...oldState,
        activeIndex: index,
        mode: MODE.UPDATE,
        formValue: { ...formValue }
      }
    );
  }),
  on(UpdateTodoSuccess, (oldState, { formValue }) => {
    // return {};
    const { activeIndex, result } = oldState;
    return Object.assign(
      {},
      { ...oldState, result: updateArr(activeIndex, formValue, result) }
    );
  })
);

export function toDoReducer(state, action) {
  return todoReducer(state, action);
}

export function updateArr(
  index,
  parm,
  cur: { code: any; name: any; type: any }[]
) {
  const c = cur.map((v, i) => {
    if (i === index) {
      return {
        code: parm.code,
        name: parm.name,
        type: parm.type
      };
    } else {
      return v;
    }
  });
  return c;
}
