import { MenuId } from '../constant/menu-id';
import { PrePareStore } from '../model/prepare-store';
import { FeatStore } from '../model/feat-store';

const prepareAllFeatKey = [MenuId].reduce((prv, cur) => {
  return { ...prv, ...cur };
}, {});

const initialKey = Object.keys(prepareAllFeatKey).map(k => {
  return k;
});

const initiaValue = new FeatStore({}, -1, 'NONE', []);

export const initialStore = initialKey.map(k => {
  return new PrePareStore(k, initiaValue);
});
