import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'
import { DictionaryService } from '../../Services/dictionary.service'
import {Restaurant, RestaurantAndMore} from "../../Models/Restaurant";
import { RestaurantService } from "../../Services/restaurant.service"

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
  regionId: string = '';
  dongId: string = '';
  categoryId: string = '';
  top_bar_menu_set: string = "btn_home";
  dictionary: DictionaryService;
  dongs: string[] = null;
  resCategories: string[] = null;
  restaurants: Restaurant[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dict: DictionaryService,
    private restaurantService: RestaurantService
  ) {
    this.dictionary = dict;
    this.dongs = Object.keys(dict.dong);
    this.resCategories = Object.keys(dict.resCategory);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.locationId = params['location'];
      this.dongId = 'all';
      this.categoryId = 'all';
      this.getRestaurants(this.locationId, this.dongId, this.categoryId);

      $.getScript('/app/Scripts/_sizer.js');
    });

  }

  getRestaurants(region: string, dong: string, category: string): void {
    this.restaurantService
      .getRestaurants(region, dong, category, this.offset)
      .then(restaurantAndMore => this.afterResService(restaurantAndMore));
  }

  afterResService(restaurantAndMore: RestaurantAndMore) {
    this.isMore = restaurantAndMore.more;
    this.restaurants = this.restaurants.concat(restaurantAndMore.restaurants);
  }

  whenReachedBottom() {
    if (this.isMore > 0) {
      if($('#scroll_area').scrollTop() + $('#scroll_area').height() == $('#scroll_height').height()) {
        this.offset++;
        this.getRestaurants(this.locationId, this.dongId, this.categoryId);
      }
    }
  }

  selectRestaurant(id: string):void {

  }
}
