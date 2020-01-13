import { Injectable } from '@angular/core';
import { Todo } from 'src/app/core/types/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  temp = [].map(v => {
    return { code: v, name: v, type: v };
  });

  private url = 'http://localhost:8080/todos';

  private updateArr(index, parm, cur: { code: any; name: any; type: any }[]) {
    const c = cur.map((v, i) => {
      if (i === index) {
        return {
          code: parm.code,
          name: parm.name,
          type: parm.type
        };
      } else {
        return v;
      }
    });
    return c;
  }

  update(index, value: Todo): Observable<Todo> {
    console.log('index ; ', index);

    const update = this.updateArr(index, value, this.temp);
    this.temp = update;
    return of(value);
  }

  create(value: Todo): Observable<Todo> {
    this.temp.push({ code: value.code, name: value.name, type: value.type });

    return of(value);
  }

  search(val): Observable<Todo[]> {
    console.log('search :', val.name);

    const search = this.temp.filter(v => v.name === val.name);

    return of(search);
    // return Observable.create(v => {
    //   return v.error(Error('searchFailed'));
    // });
  }
}
