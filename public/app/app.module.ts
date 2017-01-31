import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// 사이트를 새로고침해도 404에러가 뜨지 않도록 라우팅해준다
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AppRoutingModule } from './app-routing.module'

import { AppComponent }  from './app.component';
import { TopBarComponent } from './Components/1_top_bar/top_bar.comp'
import { DashboardComponent } from './Components/2_dashboard/dashboard.comp'
import { DeliveryComponent } from './Components/2_delivery/delivery.comp'
import { DeliveryViewComponent } from './Components/2_delivery/delivery_view.comp'
import { DeliveryService } from './Services/delivery.service'
import {HttpModule} from "@angular/http";

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, HttpModule ],
  declarations: [ AppComponent, TopBarComponent, DashboardComponent, DeliveryComponent, DeliveryViewComponent ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, DeliveryService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
