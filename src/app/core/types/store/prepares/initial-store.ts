import { MenuId } from "../constant/menu-id";
import { TodoStore } from '../type/todo-store';
import { FeatStore } from '../model/feat-store';

export function convertEnumFeatKeyToPropFeatKey(): Object {
  const result = [MenuId].reduce((prv, cur) => {
    return { ...prv, ...cur };
  }, {});
  return result;
}


export function initialPropFeatKey(menuKey: Object): string[] {
  const initialPropFeatKey = Object.keys(menuKey).map(v => {
    return v;
  });
  return initialPropFeatKey;
}


export function initialAllStoreWithFeatKey(featKey: string[]): TodoStore[] {
  const result: TodoStore[] = featKey.map(prop => {
    return {
      [prop]: new FeatStore({}, {}, -1, 'NONE', [])
    };
  });
  return result;
}


