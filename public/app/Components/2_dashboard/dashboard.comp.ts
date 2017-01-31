import {Component, OnInit} from '@angular/core';
declare var $: any

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  template: `
    <topBar [menu_set]="top_bar_menu_set"></topBar>
    <h1>hahahaha</h1>
`,
  styleUrls: ['../../Styles/2_dashboard.css'],
})
export class DashboardComponent implements OnInit {
  top_bar_menu_set:string = "dashboard";
  ngOnInit(): void {
    // $('#top_bar a').css('display', 'none');
    // $('#top_bar a.top_bar_btn_dashboard').css('display', 'inline');
  }
}
