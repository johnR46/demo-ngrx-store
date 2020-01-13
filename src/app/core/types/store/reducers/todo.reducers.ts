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
import {
  convertEnumFeatKeyToPropFeatKey,
  initialPropFeatKey,
  initialAllStoreWithFeatKey
} from '../prepares/initial-store';
import {
  selectStoreWithFeatKey,
  updateModeInStore,
  updatedGlobalTodoStore,
  InsertTopResultWithFormValueInStore,
  updateCriteriaInStore,
  ResetAndInsertResultInStore,
  prepareFeatStore,
  updateFormValueInStore,
  updateActiveIndexInStore,
  updateResultWithIndex
} from '../util/utilStore';
import { MenuId } from '../constant/menu-id';

const allMenuIdKey = convertEnumFeatKeyToPropFeatKey();
const allPropKey = initialPropFeatKey(allMenuIdKey);
const allInitialStore = initialAllStoreWithFeatKey(allPropKey);

/*

on(ActionA,ActionB,state => {   เกิด A   หรีอ  B  จะทำ  reducer เดียวกัน
  return Obj.assign({},{...state})
})


*/

export const todoReducer = createReducer(
  allInitialStore,
  on(CreateTodo, (oldState, { featKey }) => {
    const selectWithKey = selectStoreWithFeatKey(featKey, oldState);
    const updateFormValue = updateFormValueInStore({}, selectWithKey);
    const updateActiveIndex = updateActiveIndexInStore(-1, updateFormValue);
    const updateMode = updateModeInStore('CREATE', updateActiveIndex);

    const updateResult = ResetAndInsertResultInStore(
      updateMode.getResult(),
      updateMode
    );
    const newStateAfterUpdateMode = updatedGlobalTodoStore(
      featKey,
      updateResult,
      oldState
    );
    return newStateAfterUpdateMode;
  }),
  on(CreateTodoSuccess, (oldState, { featKey, formValue }) => {
    const selectWithKey = selectStoreWithFeatKey(featKey, oldState);

    const updateResult = InsertTopResultWithFormValueInStore(
      formValue,
      selectWithKey
    );
    const newStateAfterUpdateMode = updatedGlobalTodoStore(
      featKey,
      updateResult,
      oldState
    );
    return newStateAfterUpdateMode;
  }),
  on(SearchTodoSuccess, (oldState, { featKey, criteria, result }) => {
    const selectWithKey = selectStoreWithFeatKey(featKey, oldState);
    const updatedCriteria = updateCriteriaInStore(criteria, selectWithKey);
    const updateResult = ResetAndInsertResultInStore(result, updatedCriteria);
    const newStateAfterUpdateMode = updatedGlobalTodoStore(
      featKey,
      updateResult,
      oldState
    );
    console.log(newStateAfterUpdateMode);
    return newStateAfterUpdateMode;
  }),
  on(SearchTodoFailed, (oldState, { featKey, criteria }) => {
    const selectWithKey = selectStoreWithFeatKey(featKey, oldState);
    const updatedCriteria = updateCriteriaInStore(criteria, selectWithKey);
    const updateResult = ResetAndInsertResultInStore([], updatedCriteria);

    const newStateAfterUpdateMode = updatedGlobalTodoStore(
      featKey,
      updateResult,
      oldState
    );
    return newStateAfterUpdateMode;
  }),
  on(ResetTodo, (oldState, { featKey }) => {
    const resetFeateStore = prepareFeatStore();
    const newStateAfterUpdateMode = updatedGlobalTodoStore(
      featKey,
      resetFeateStore,
      oldState
    );
    return newStateAfterUpdateMode;
  }),
  on(ViewTodo, (oldState, { featKey, formValue }) => {
    const selectWithKey = selectStoreWithFeatKey(featKey, oldState);
    const updateMode = updateModeInStore('VIEW', selectWithKey);
    const updateFormValue = updateFormValueInStore(formValue, updateMode);

    const newStateAfterUpdateMode = updatedGlobalTodoStore(
      featKey,
      updateFormValue,
      oldState
    );
    return newStateAfterUpdateMode;
  }),
  on(UpdateTodo, (oldState, { featKey, activeIndex, formValue }) => {
    const selectWithKey = selectStoreWithFeatKey(featKey, oldState);
    const updateMode = updateModeInStore('UPDATE', selectWithKey);
    const updateFormValue = updateFormValueInStore(formValue, updateMode);
    const updateActiveIndex = updateActiveIndexInStore(
      activeIndex,
      updateFormValue
    );

    const newStateAfterUpdateMode = updatedGlobalTodoStore(
      featKey,
      updateActiveIndex,
      oldState
    );
    return newStateAfterUpdateMode;
  }),

  on(UpdateTodoSuccess, (oldState, { featKey, formValue }) => {
    const selectWithKey = selectStoreWithFeatKey(featKey, oldState);
    const oldResult = selectWithKey.getResult();
    const indexWithUpdate = selectWithKey.getActiveIndex();
    const updateResult = updateResultWithIndex(
      indexWithUpdate,
      formValue,
      oldResult
    );
    const updatedFinish = ResetAndInsertResultInStore(
      updateResult,
      selectWithKey
    );
    const newStateAfterUpdateMode = updatedGlobalTodoStore(
      featKey,
      updatedFinish,
      oldState
    );
    return newStateAfterUpdateMode;
  })
);

export function toDoReducer(state, action) {
  return todoReducer(state, action);
}
