import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
declare var $: any

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  template: `
    <topBar [locationId]="locationId" [menu_set]="top_bar_menu_set"></topBar>
    <h1>hahahaha</h1>
`,
  styleUrls: ['../../Styles/2_dashboard.css'],
})
export class DashboardComponent implements OnInit {
  locationId: string = '';
  top_bar_menu_set:string = "dashboard";

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.locationId = params['location'];

      $.getScript('/app/Scripts/_sizer.js');
    });
  }
}
