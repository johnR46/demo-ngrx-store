import { MODE } from '../constant/mode';

export interface AppState {
  todo: {
    criteria?: {};
    result?: {}[];
    mode?: MODE;
    activeIndex?: number;
    formValue?: {};
  };
}
