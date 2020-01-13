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
import { MenuId } from '../constant/menu-id';
import { FeatStore } from '../model/feat-store';
import { PrePareStore } from '../model/prepare-store';
import { initialStore } from '../prepares/initial-store';

/*

on(ActionA,ActionB,state => {   เกิด A   หรีอ  B  จะทำ  reducer เดียวกัน
  return Obj.assign({},{...state})
})


*/

export const todoReducer = createReducer(
  initialStore,
  on(CreateTodo, (oldState, { featKey }) => {
    const selectWithKey = oldState.filter(key => key.getFeatMenu() === featKey);
    const oldStore = selectWithKey[0];

    const updated = new FeatStore(
      oldStore.getFormValue(),
      oldStore.getActiveIndex(),
      'CREATE',
      oldStore.getResult()
    );

    const newprepare = new PrePareStore(featKey, updated);

    const newStateAfterupdate = oldState.map(value => {
      if (value.getFeatMenu() === featKey) {
        return newprepare;
      } else {
        return value;
      }
    });

    return newStateAfterupdate;
  }),
  on(CreateTodoSuccess, (oldState, { featKey, formValue }) => {
    const selectWithKey = oldState.filter(key => key.getFeatMenu() === featKey);
    const oldStore = selectWithKey[0];
    const oldResult = oldStore.getResult();

    const newResult = [formValue].concat(oldResult);

    const updated = new FeatStore(
      oldStore.getFormValue(),
      oldStore.getActiveIndex(),
      oldStore.getMode(),
      newResult
    );

    const newprepare = new PrePareStore(featKey, updated);

    const newStateAfterupdate = oldState.map(value => {
      if (value.getFeatMenu() === featKey) {
        return newprepare;
      } else {
        return value;
      }
    });

    return newStateAfterupdate;
  })
  // on(SearchTodoFailed, (oldState, { criteria: cc }) => {
  //   return Object.assign(
  //     {},
  //     { ...oldState, activeIndex: null, criteria: cc, result: [] }
  //   );
  // }),
  // on(ResetTodo, oldState => {
  //   return Object.assign({}, { ...oldState, ...initialState });
  // }),
  // on(ViewTodo, (state, { formValue }) => {
  //   const oldState = state;
  //   return Object.assign(
  //     {},
  //     { ...oldState, mode: MODE.VIEW, formValue: { ...formValue } }
  //   );
  // }),
  // on(UpdateTodo, (oldState, { activeIndex: index, formValue }) => {
  //   return Object.assign(
  //     {},
  //     {
  //       ...oldState,
  //       activeIndex: index,
  //       mode: MODE.UPDATE,
  //       formValue: { ...formValue }
  //     }
  //   );
  // }),
  // on(UpdateTodoSuccess, (oldState, { formValue }) => {
  //   // return {};
  //   const { activeIndex, result } = oldState;
  //   return Object.assign(
  //     {},
  //     { ...oldState, result: updateArr(activeIndex, formValue, result) }
  //   );
  // })
);

export function toDoReducer(state, action) {
  return todoReducer(state, action);
}

// export function updateArr(
//   index,
//   parm,
//   cur: { code: any; name: any; type: any }[]
// ) {
//   const c = cur.map((v, i) => {
//     if (i === index) {
//       return {
//         code: parm.code,
//         name: parm.name,
//         type: parm.type
//       };
//     } else {
//       return v;
//     }
//   });
//   return c;
// }
