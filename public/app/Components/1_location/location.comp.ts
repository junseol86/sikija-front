/**
 * Created by Hyeonmin on 2017-02-02.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '../../Models/Location'
import { LocationService } from '../../Services/location.service'

import {CookieService} from 'angular2-cookie/core';

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'location',
  templateUrl: './location.comp.html',
  styleUrls: ['../../Styles/1_location.css'],
})

export class LocationComponent implements OnInit {
  top_bar_menu_set:string = "select_location";
  locations: Location[];

  constructor(
    private router: Router,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    let location = this.cookie.get("location");

    this.getLocations();
    $.getScript('/app/Scripts/_sizer.js');
  }

  getLocations(): void {
    this.locationService
      .getLocations()
      .then(locations => this.locations = locations);
  }

  selectLocation(locationId: number): void {
    this.cookie.put("location", locationId.toString());
    this.router.navigate(['/dashboard/' + locationId], {replaceUrl: true});
  }

}
