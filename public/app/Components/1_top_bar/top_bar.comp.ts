import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
declare var $: any

@Component({
  moduleId: module.id,
  selector: 'topBar',
  templateUrl: 'top_bar.comp.html',
  styleUrls: ['../../Styles/1_top_bar.css'],
})
export class TopBarComponent implements OnInit {
  @Input() menu_set: string;
  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goHome(): void {
    this.router.navigate(['/'])
  }
  goBack(): void {
    this.location.back()
  }
}
