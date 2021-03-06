import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// 사이트를 새로고침해도 404에러가 뜨지 않도록 라우팅해준다
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AppRoutingModule } from './app-routing.module'

import { AppComponent }  from './app.component';
import { TopBarComponent } from './Components/_top_bar/top_bar.comp'
import { LocationComponent } from './Components/1_location/location.comp'
import { LocationService } from './Services/location.service'
import { DashboardComponent } from './Components/2_dashboard/dashboard.comp'
import { DeliveryComponent } from './Components/3_delivery/delivery.comp'
import { DeliveryViewComponent } from './Components/3_delivery/delivery_view.comp'
import { RestaurantComponent } from './Components/4_restaurant/restaurant.comp'
import { FranchiseComponent } from './Components/5_franchise/franchise.comp'
import { RestaurantViewComponent } from './Components/4_restaurant/restaurant_view.comp'
import { DeliveryService } from './Services/delivery.service'
import { RestaurantService } from './Services/restaurant.service'
import { FranchiseService } from './Services/franchise.service'
import { DashboardService } from './Services/dashboard.service'
import { DictionaryService } from './Services/dictionary.service'
import { FacebookService } from './Services/facebook.service'
import {HttpModule} from "@angular/http";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {SingletonService} from "./Services/singleton.service";

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, HttpModule ],
  declarations: [ AppComponent, TopBarComponent,
    LocationComponent, DashboardComponent, DeliveryComponent, DeliveryViewComponent, RestaurantComponent, RestaurantViewComponent, FranchiseComponent ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, DeliveryService, RestaurantService, FranchiseService,
    LocationService, DictionaryService, DashboardService, SingletonService, FacebookService,
    CookieService,],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
