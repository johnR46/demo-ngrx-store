import { TodoStore } from './todo-store';

export interface AppState {
  todo: {
    store: TodoStore[]
  };
}
