import { createReducer, on } from '@ngrx/store';
import { SearchState } from '../type/search-state';
import { searchTodo, resetSearchTodo } from '../actions/search.action';
import { CreateTodoSuccess, UpdateTodoSuccess } from '../actions/crud.action';

const initialSearchState: SearchState = {
  criteria: null,
  activeIndex: null,
  result: { value: [] }
};

const _searchReducer = createReducer(
  initialSearchState,
  on(searchTodo, (state, { searchState }) => {
    const featState = state;
    return Object.assign({}, { ...featState, ...searchState });
  }),
  on(resetSearchTodo, (state, { searchState }) => {
    return Object.assign({}, { ...searchState });
  }),
  on(CreateTodoSuccess, (state, { searchState }) => {
    const featState = state;
    return Object.assign(
      {},
      {
        ...featState,
        criteria: featState.criteria,
        activeIndex: featState.activeIndex,
        result: {
          value: [...featState.result.value, ...searchState.result.value]
        }
      }
    );
  }),
  on(UpdateTodoSuccess, (state, { searchState }) => {
    const featState = state;
    return Object.assign(
      {},
      {
        ...featState,
        criteria: featState.criteria,
        activeIndex: featState.activeIndex,
        result: {
          value: featState.result.value.map(v => {
            if (v.code === searchState.result.value[0].code) {
              return {
                code: searchState.result.value[0].code,
                name: searchState.result.value[0].name,
                type: searchState.result.value[0].type
              };
            } else {
              return v;
            }
          })
        }
      }
    );
  })
);

export function SearchReducer(state, action) {
  return _searchReducer(state, action);
}
