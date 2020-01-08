import { createAction, props } from '@ngrx/store';

export const View = createAction('View', props<{ key: string; data: any }>());

export const Reset = createAction('Reset', props<{ key: string; data: any }>());

export const Create = createAction(
  'Create',
  props<{ key: string; data: any }>()
);
export const Update = createAction(
  'Update',
  props<{ key: string; data: any }>()
);
