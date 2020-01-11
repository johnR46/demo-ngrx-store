import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCustomerRoutingModule } from './add-customer-routing.module';
import { AddCusFormPageComponent } from './containers/add-cus-form-page.component';
import { AddCusSearchPageComponent } from './containers/add-cus-search-page.component';

@NgModule({
  declarations: [AddCusFormPageComponent, AddCusSearchPageComponent],
  imports: [CommonModule, AddCustomerRoutingModule]
})
export class AddCustomerModule {}
