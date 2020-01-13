import { MODE } from '../constant/mode';

export class FeatStore {
  constructor(
    private criteria: Object,
    private formValue: Object,
    private activeIndex: number,
    private mode: MODE,
    private result: Array<Object>
  ) {}

  setCriteria(criteria: Object): void {
    this.criteria = criteria;
  }

  setFormValue(form: Object): void {
    this.formValue = form;
  }

  getCriteria(): Object {
    return this.criteria;
  }

  getFormValue(): Object {
    return this.formValue;
  }

  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }
  setMode(mode: MODE): void {
    this.mode = mode;
  }

  setResult(result: Array<Object>) {
    this.result = result;
  }

  getResult(): Array<Object> {
    return this.result;
  }
  getMode(): MODE {
    return this.mode;
  }
  getActiveIndex(): number {
    return this.activeIndex;
  }
}
