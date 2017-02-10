import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '../../Models/Location'
import { LocationService } from '../../Services/location.service'

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationService: LocationService
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
      .then(location => this.locationObj = location);
  }

}
