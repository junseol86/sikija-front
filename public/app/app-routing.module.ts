import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationComponent } from './Components/1_location/location.comp'
import { DashboardComponent } from './Components/2_dashboard/dashboard.comp'
import { DeliveryComponent } from './Components/3_delivery/delivery.comp'
import { DeliveryViewComponent } from './Components/3_delivery/delivery_view.comp'
import {RestaurantComponent} from "./Components/4_restaurant/restaurant.comp";

const routes: Routes = [
  { path: '', redirectTo: '/location', pathMatch: 'full' },
  { path: 'location',  component: LocationComponent },
  { path: 'dashboard/:location',  component: DashboardComponent },
  { path: 'delivery/:location',  component: DeliveryComponent },
  { path: 'delivery/:location/view/:id',  component: DeliveryViewComponent },
  { path: 'restaurant/:location',  component: RestaurantComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
