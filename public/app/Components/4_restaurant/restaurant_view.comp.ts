/**
 * Created by Hyeonmin on 2017-02-24.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'
import { DictionaryService } from '../../Services/dictionary.service'
import {Restaurant, RestaurantAndMore, RestaurantDetail} from "../../Models/Restaurant";
import { RestaurantService } from "../../Services/restaurant.service"

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'restaurant_view',
  templateUrl: './restaurant_view.comp.html',
  styleUrls: ['../../Styles/4_restaurant.css'],
})

export class RestaurantViewComponent implements OnInit {
  restaurantId = '';
  top_bar_menu_set:string = "btn_back";
  dictionary: DictionaryService;
  restaurantDetail: RestaurantDetail;
  resDong: string;
  resCategory: string[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dict: DictionaryService,
    private restaurantService: RestaurantService
  ) {
    this.dictionary = dict;
  }

  ngOnInit():void {
    $.getScript('/app/Scripts/_sizer.js');

    this.activatedRoute.params.subscribe((params: Params) => {
      this.restaurantId = params['id'];
      this.getRestaurant(Number(this.restaurantId));
    });

  }


  getRestaurant(id: number):void {
    this.restaurantService
      .getRestaurant(id)
      .then(restaurantDetail => this.afterGettingRestaurant(restaurantDetail));
  }

  afterGettingRestaurant(resDetail: RestaurantDetail) {
    this.restaurantDetail = resDetail;
    this.resDong = this.dict.dongKor(this.restaurantDetail.dong);
    this.resCategory = [];
    for (var i = 0; i < this.restaurantDetail.category.length; i++) {
      this.resCategory.push(this.dict.resCatKor(this.restaurantDetail.category[i]));
    }
    $.getScript('/app/Scripts/_sizer.js');
  }

  goToLink(link:string) {
    window.open(link, '_blank');
  }

}
