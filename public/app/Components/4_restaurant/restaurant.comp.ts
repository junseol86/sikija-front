import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'
import { DictionaryService } from '../../Services/dictionary.service'

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'restaurant',
  templateUrl: './restaurant.comp.html',
  styleUrls: ['../../Styles/4_restaurant.css'],
})

export class RestaurantComponent implements OnInit {
  offset = 0;
  isMore:Number = 2;
  locationId: string = '';
  categoryId: string = '';
  top_bar_menu_set: string = "btn_home";
  dictionary: DictionaryService = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dict: DictionaryService
  ) {
    this.dictionary = dict;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.locationId = params['location'];
      this.categoryId = 'all';

      $.getScript('/app/Scripts/_sizer.js');
    });

  }
}
