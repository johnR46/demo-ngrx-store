import { Injectable } from '@angular/core';
import { Todo } from 'src/app/core/types/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  temp = [].map(v => {
    return { code: v, name: v, type: v };
  });

  private url = 'http://localhost:8080/todos';

  update(value: Todo): Observable<Todo> {
    const update = this.temp.map(v => {
      if (value.code === v.code) {
        return {
          code: value.code,
          name: value.name,
          type: value.type
        };
      } else {
        return v;
      }
    });
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
  }
}
