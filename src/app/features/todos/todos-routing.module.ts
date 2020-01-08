import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './containers/todo-list.component';
import { TodoItemComponent } from './containers/todo-item.component';

const routes: Routes = [
  { path: '', component: TodoItemComponent },
  { path: 'create', component: TodoListComponent },
  { path: 'view', component: TodoListComponent },
  { path: 'update', component: TodoListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {}
