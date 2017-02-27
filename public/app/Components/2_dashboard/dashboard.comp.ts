import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '../../Models/Location'
import { LocationService } from '../../Services/location.service'

import { DictionaryService } from '../../Services/dictionary.service'

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationService,
    private dict: DictionaryService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.locationId = params['location'];
      this.getALocation();

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

  createIcon():void {
  }

}
