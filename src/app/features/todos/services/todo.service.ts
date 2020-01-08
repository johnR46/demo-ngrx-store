import { Injectable } from '@angular/core';
import { Todo } from 'src/app/core/types/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return Observable.create(observer => {
      observer.next(value);
      observer.complete();
    });
  }

  create(value: Todo): Observable<Todo> {
    this.temp.push({ code: value.code, name: value.name, type: value.type });
    // tslint:disable-next-line: deprecation
    return Observable.create(observer => {
      observer.next(value);
      observer.complete();
    });
    // return this.http.post<Todo>(this.url + '/create', value);
  }

  search(val): Observable<Todo[]> {
    return Observable.create(observer => {
      observer.next(this.temp);
      observer.complete();
    });
  }
}
