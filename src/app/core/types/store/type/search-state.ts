export interface SearchState {
  criteria?: Criteria;
  result?: Result;
  activeIndex?: ActiveIndex;
}

export interface ActiveIndex {
  value: any;
}
export interface Criteria {
  value: any;
}

export interface Result {
  value: any[];
}
