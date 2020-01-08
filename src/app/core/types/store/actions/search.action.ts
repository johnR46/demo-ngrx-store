import { createAction, props } from '@ngrx/store';
import { SearchState } from '../type/search-state';

export const searchTodo = createAction(
  '[Todo] Search',
  props<{
    searchState: SearchState;
  }>()
);

export const resetSearchTodo = createAction(
  '[Todo] Reset Search',
  props<{
    searchState: SearchState;
  }>()
);

// export const clearTodo = createAction('[Todo] Clear', props<{}>());
