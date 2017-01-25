import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
declare var $: any

@Component({
  moduleId: module.id,
  selector: 'topbar',
  templateUrl: './topbar.comp.html',
  styleUrls: ['../../Styles/1_topbar.css'],
})
export class TopBarComponent {
  constructor(
    private router: Router,
    private location: Location
  ) { }
  goHome(): void {
    this.router.navigate(['/'])
  }
  goBack(): void {
    this.location.back()
  }
}
