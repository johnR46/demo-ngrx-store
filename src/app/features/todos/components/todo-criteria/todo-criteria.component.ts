import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { SearchCriteria } from 'src/app/core/types/search-criteria';

@Component({
  selector: 'app-todo-criteria',
  templateUrl: './todo-criteria.component.html',
  styleUrls: ['./todo-criteria.component.scss']
})
export class TodoCriteriaComponent implements OnInit {
  @Input() criteria: any;
  @Output() search = new EventEmitter<SearchCriteria>();
  @Output() clear = new EventEmitter<void>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: undefined
    });
  }

  ngOnInit() {
    if (this.criteria) {
      const {
        value: { name }
      } = this.criteria || { value: { name: '' } };

      console.log(name);

      this.searchForm.patchValue({ name } || {});
    }
  }

  toSearch(): void {
    this.search.emit(this.searchFormValue);
  }

  toClear(): void {
    this.searchForm.reset();
    this.clear.emit();
  }

  get searchFormValue(): SearchCriteria {
    return this.searchForm.getRawValue();
  }
}
