import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '../../Models/Location'
import { LocationService } from '../../Services/location.service'
import { JobService } from '../../Services/job.service'

import { DictionaryService } from '../../Services/dictionary.service'
import {Job} from "../../Models/Job";

declare var $: any

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationService,
    private jobService: JobService,
    private dict: DictionaryService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.locationId = params['location'];
      this.getALocation();
      this.getJobs('AG3');

      $.getScript('/app/Scripts/_sizer.js');
    });
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
        scrollTop: c_i_desc.offset().top + 'px'
      }, 'fast');
    }
    else
      c_i_desc.hide();
  }

  getJobs(regionCode: string): void {
    this.jobService
      .getJobs(regionCode).then(jobs => this.afterGettingJobs(jobs));
  }

  afterGettingJobs(jobs: Job[]): void {
    this.jobs = jobs;
  }

}
