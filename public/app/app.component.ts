import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
declare var $: any
declare var ga:Function;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <div id="outer_space">
      <div id="outer_wrapper">
          <!--<topBar></topBar>-->
          <router-outlet></router-outlet>
      </div>
    </div>
`,
  styleUrls: ['Styles/0_app.css'],
})
export class AppComponent implements OnInit {

  currentRoute: string = '';
  constructor(router: Router) {
    router.events.subscribe((route) => {
      var newRoute = route.url || '/';
      if(newRoute !== this.currentRoute) {
        ga('send', 'pageview', newRoute);
        this.currentRoute = newRoute;
      }
    });
  }

  ngOnInit() {
    $.getScript('/app/Scripts/0_app.js');
  }
}
