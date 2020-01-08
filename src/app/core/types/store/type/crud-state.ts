import { Mode } from './mode';

export interface CrudState {
  formValue?: FormValue;
  mode?: Mode;
}

export interface FormValue {
  value: any;
}
