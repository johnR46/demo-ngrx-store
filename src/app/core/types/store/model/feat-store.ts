import { MODE } from '../constant/mode';

export class FeatStore {
  constructor(
    private formValue: Object,
    private activeIndex: number,
    private mode: MODE,
    private result: Array<Object>
  ) {
    this.formValue = formValue;
    this.activeIndex = activeIndex;
    this.mode = mode;
    this.result = result;
  }

  setResult(result: Array<Object>) {
    this.result = result;
  }

  setActiveIndex(activeIndex: number) {
    this.activeIndex = activeIndex;
  }
  setFormValue(formValue: Object) {
    this.formValue = formValue;
  }

  setMode(mode: MODE) {
    this.mode = mode;
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

  getFormValue(): Object {
    return this.formValue;
  }
}
