import {Component, OnInit} from '@angular/core';
declare var $: any

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <div id="outer_space">
      <div id="outer_wrapper">
          <topbar></topbar>
          <router-outlet></router-outlet>
      </div>
    </div>
`,
  styleUrls: ['Styles/0_app.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    $.getScript('/app/Scripts/0_sizer.js');
  }
}
