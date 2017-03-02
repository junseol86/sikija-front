import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
declare var $: any

@Component({
  moduleId: module.id,
  selector: 'topBar',
  templateUrl: 'top_bar.comp.html',
  styleUrls: ['../../Styles/0_top_bar.css'],
})
export class TopBarComponent implements OnInit {
  @Input() locationId: string;
  @Input() menu_set: string;
  @Input() locationObj: Location;
  @Input() regionName: string;
  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goHome(): void {
    this.router.navigate(['/dashboard/' + this.locationId])
  }
  goBack(): void {
    this.location.back()
  }
}
