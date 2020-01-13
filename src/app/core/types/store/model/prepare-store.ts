import { FeatStore } from './feat-store';
import { MODE } from '../constant/mode';

export class PrePareStore {
  constructor(private featMenu: string, private featStore = featStore) {
    this.featMenu = featMenu;
    this.featStore = featStore;
  }

  setResult(result: Array<Object>) {
    this.featStore.setResult(result);
  }

  setActiveIndex(activeIndex: number) {
    this.featStore.setActiveIndex(activeIndex);
  }
  setFormValue(formValue: Object) {
    this.featStore.setFormValue(formValue);
  }

  setMode(mode: MODE) {
    this.featStore.setMode(mode);
  }

  getResult(): Array<Object> {
    return this.featStore.getResult();
  }
  getMode(): MODE {
    return this.featStore.getMode();
  }
  getActiveIndex(): number {
    return this.featStore.getActiveIndex();
  }

  getFormValue(): Object {
    return this.featStore.getFormValue();
  }

  setFeatStore(featStore: FeatStore) {
    this.featStore = featStore;
  }

  setFeatMenu(featMenu: string) {
    this.featMenu = featMenu;
  }

  getFeatMenu(): string {
    return this.featMenu;
  }
  getFeatStore(): PrePareStore {
    return this.featStore;
  }
}
