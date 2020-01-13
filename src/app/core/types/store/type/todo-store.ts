import { FeatStore } from "../model/feat-store";

export interface TodoStore {
  [featKey: string]: FeatStore;
}
