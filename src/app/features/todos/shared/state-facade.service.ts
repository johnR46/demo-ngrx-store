import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateFacadeService {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count'));
  }

  get Count(): Observable<number> {
    return this.count$;
  }

  increment() {
    this.store.dispatch(increment());
  }
  decrement() {
    this.store.dispatch(decrement());
  }
  reset() {
    this.store.dispatch(reset());
  }
}
