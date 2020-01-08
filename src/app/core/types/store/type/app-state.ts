import { SearchState } from './search-state';
import { CrudState } from './crud-state';

export interface AppState {
  search: SearchState;
  crud: CrudState;
}
