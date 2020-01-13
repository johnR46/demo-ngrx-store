import { MenuId } from '../constant/menu-id';
import { TodoStore } from '../type/todo-store';
import { FeatStore } from '../model/feat-store';
import { MODE } from '../constant/mode';

export function selectStoreWithFeatKey(
  menu: MenuId,
  store: TodoStore[]
): FeatStore {
  const result = store.filter(cur => cur[menu]);
  return result[0][menu];
}

export function updateCriteriaInStore(
  criteria: Object,
  store: FeatStore
): FeatStore {
  const updated = new FeatStore(
    criteria,
    store.getFormValue(),
    store.getActiveIndex(),
    store.getMode(),
    store.getResult()
  );
  return updated;
}

export function prepareFeatStore(): FeatStore {
  const result = new FeatStore({}, {}, -1, 'NONE', []);
  return result;
}

export function updateFormValueInStore(
  form: Object,
  store: FeatStore
): FeatStore {
  const updated = new FeatStore(
    store.getCriteria(),
    form,
    store.getActiveIndex(),
    store.getMode(),
    store.getResult()
  );
  return updated;
}

export function updateActiveIndexInStore(
  index: number,
  store: FeatStore
): FeatStore {
  const updated = new FeatStore(
    store.getCriteria(),
    store.getFormValue(),
    index,
    store.getMode(),
    store.getResult()
  );
  return updated;
}

export function ResetAndInsertResultInStore(
  result: Array<Object>,
  store: FeatStore
): FeatStore {
  const updated = new FeatStore(
    store.getCriteria(),
    store.getFormValue(),
    store.getActiveIndex(),
    store.getMode(),
    result
  );
  return updated;
}

export function updateModeInStore(mode: MODE, store: FeatStore): FeatStore {
  const updated = new FeatStore(
    store.getCriteria(),
    store.getFormValue(),
    store.getActiveIndex(),
    mode,
    store.getResult()
  );
  return updated;
}

export function updatedGlobalTodoStore(
  featKey: MenuId,
  featStore: FeatStore,
  oldstore: TodoStore[]
): TodoStore[] {
  const newStateAfterUpdateMode = oldstore.map(value => {
    if (value[featKey]) {
      return {
        [featKey]: featStore
      };
    } else {
      return value;
    }
  });

  return newStateAfterUpdateMode;
}

export function InsertTopResultWithFormValueInStore(
  form: Object,
  store: FeatStore
): FeatStore {
  const oldResult = store.getResult();
  const newResult = [form].concat(oldResult);

  const updated = new FeatStore(
    store.getCriteria(),
    store.getFormValue(),
    store.getActiveIndex(),
    store.getMode(),
    newResult
  );
  return updated;
}

export function updateResultWithIndex(
  index: number,
  formVal: Object,
  oldResult: Array<Object>
): Array<Object> {
  const newResult = oldResult.map((value, indexValue) => {
    if (indexValue === index) {
      return formVal;
    } else {
      return value;
    }
  });
  return newResult;
}
