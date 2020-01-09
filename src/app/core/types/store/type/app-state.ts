import { MODE } from '../constant/mode';

export interface AppState {
  criteria?: {};
  result?: {}[];
  mode?: MODE;
  activeIndex?: number;
  formValue?: {};
}
