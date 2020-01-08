import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoItemComponent } from './containers/todo-item.component';
import { TodoListComponent } from './containers/todo-list.component';
import { TodoCriteriaComponent } from './components/todo-criteria/todo-criteria.component';
import { TodoResultComponent } from './components/todo-result/todo-result.component';
import { TodoItemFormComponent } from './components/todo-item-form/todo-item-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    TodoItemComponent,
    TodoListComponent,
    TodoCriteriaComponent,
    TodoResultComponent,
    TodoItemFormComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatButtonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class TodosModule {}
