import {Component, OnInit} from '@angular/core';
declare var $: any

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  template: `
    <h1>hahahaha</h1>
`,
  styleUrls: ['../../Styles/2_dashboard.css'],
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    $('#topbar a').css('display', 'none');
    $('#topbar a.topbar_btn_dashboard').css('display', 'inline');
  }
}
