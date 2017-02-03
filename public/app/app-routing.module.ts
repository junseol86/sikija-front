import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationComponent } from './Components/1_location/location.comp'
import { DashboardComponent } from './Components/2_dashboard/dashboard.comp'
import { DeliveryComponent } from './Components/3_delivery/delivery.comp'
import { DeliveryViewComponent } from './Components/3_delivery/delivery_view.comp'

const routes: Routes = [
  { path: '', redirectTo: '/location', pathMatch: 'full' },
  { path: 'location',  component: LocationComponent },
  { path: 'dashboard/:location',  component: DashboardComponent },
  { path: 'delivery/:location/:category',  component: DeliveryComponent },
  { path: 'delivery/:location/view/:id',  component: DeliveryViewComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
