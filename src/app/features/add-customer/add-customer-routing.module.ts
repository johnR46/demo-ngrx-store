import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCusSearchPageComponent } from './containers/add-cus-search-page.component';
import { AddCusFormPageComponent } from './containers/add-cus-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: AddCusSearchPageComponent
  },
  {
    path: 'create',
    component: AddCusFormPageComponent
  },
  {
    path: 'update',
    component: AddCusFormPageComponent
  },
  {
    path: 'inactive',
    component: AddCusFormPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCustomerRoutingModule {}
