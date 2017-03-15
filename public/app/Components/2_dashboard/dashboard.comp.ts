import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '../../Models/Location'
import { LocationService } from '../../Services/location.service'
import { DashboardService } from '../../Services/dashboard.service'

import { DictionaryService } from '../../Services/dictionary.service'
import {Job} from "../../Models/Job";
import {RestaurantForDashboard, Restaurant} from "../../Models/Restaurant"
import {SingletonService} from "../../Services/singleton.service";


declare var $: any;
declare const FB:any;

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: './dashboard.comp.html',
  styleUrls: ['../../Styles/2_dashboard.css'],
})
export class DashboardComponent implements OnInit {
  locationId: string = '';
  top_bar_menu_set:string = "dashboard";
  locationObj: Location = null;
  regionName: string = '';
  jobs: Job[] = [];
  restaurants: RestaurantForDashboard[] = [];
  newRestaurants: Restaurant[] = [];
  dictionary: DictionaryService;
  loggedIn:boolean = false;

  sgtSvc = SingletonService.getInstance();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationService,
    private dashboardService: DashboardService,
    private dict: DictionaryService,
  ) {
    this.dictionary = dict;

    FB.init({
      appId      : '898278946975693',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });


  }


  ngOnInit(): void {
    this.sgtSvc.setDeliveryStateNull();

    $.getScript('/app/Scripts/_sizer.js');
    $.getScript('/app/Scripts/_image_processor.js');
    this.activatedRoute.params.subscribe((params: Params) => {
      this.locationId = params['location'];
      this.getALocation();
      this.getJobs();
      this.getRestaurants();
      this.getNewRestaurants();
    });

    this.fb_checkLogin();
  }

  fb_login() {
    FB.login((response:any) => {
      this.afterCheckingLogin(response);
    });
  }

  fb_checkLogin() {
    FB.getLoginStatus((response:any) => {
      this.afterCheckingLogin(response);
    });
  }

  fb_logout() {
    FB.logout((response:any) => {
      this.afterCheckingLogin(response);
    })
  }

  afterCheckingLogin(response:any) {
    console.log(response);
    this.loggedIn = response.status != 'unknown' ? true : false;
  }

  getALocation(): void {
    this.locationService
      .getALocation(this.locationId)
      .then(location => this.afterGetALocation(location));
  }

  afterGetALocation(location: Location): void {
    this.locationObj = location;
    this.regionName = this.dict.regionKor(location.region);
  }

  toDelivery(): void {
    this.router.navigate(['/delivery/' + this.locationId])
  }

  toRestaurant(): void {
    this.router.navigate(['/restaurant/' + this.locationId])
  }

  createIconToggle():void {
    let c_i_desc = $('#create_icon > div:last-child');
    if (c_i_desc.css('display') == 'none') {
      c_i_desc.show();
      $('#scroll_area').animate({
        scrollTop: $('#scroll_height').height() + 'px'
      }, 'fast');
    }
    else
      c_i_desc.hide();
  }

  getJobs(): void {
    this.dashboardService
      .getJobs().then(jobs => this.afterGettingJobs(jobs));
  }
  afterGettingJobs(jobs: Job[]): void {
    this.jobs = jobs.slice(0, 3);
  }

  getRestaurants(): void {
    this.dashboardService
      .getRestaurants().then(restaurants => this.afterGettingRestaurants(restaurants));
  }
  afterGettingRestaurants(restaurants: RestaurantForDashboard[]):void {
    this.restaurants = restaurants;
    $.getScript('/app/Scripts/2_dashboard_restaurant.js');
  }

  getNewRestaurants(): void {
    this.dashboardService
      .getNewRestaurants().then(newRestaurants => this.afterGettingNewRestaurants(newRestaurants));
  }

  afterGettingNewRestaurants(newRestaurants: Restaurant[]): void {
    this.newRestaurants = newRestaurants;
  }

  linkTo(link: string) {
    window.open(link, '_blank');
  }

  selectRestaurant(id: string):void {
    this.router.navigate(['/restaurant/view/' + id]);
  }


}
