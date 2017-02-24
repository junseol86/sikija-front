/**
 * Created by Hyeonmin on 2017-02-24.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'
import { DictionaryService } from '../../Services/dictionary.service'
import {Restaurant, RestaurantAndMore} from "../../Models/Restaurant";
import { RestaurantService } from "../../Services/restaurant.service"

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'restaurant_view',
  templateUrl: './restaurant_view.comp.html',
  styleUrls: ['../../Styles/4_restaurant.css'],
})

export class RestaurantComponent implements OnInit {
  restaurantId = '';
  dictionary: DictionaryService;
  dong: string[] = null;
  resCategory: string[] = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dict: DictionaryService,
    private restaurantService: RestaurantService
  ) {
    this.dictionary = dict;
    this.dong = Object.keys(dict.dong);
    this.resCategory = Object.keys(dict.resCategory);
  }

  ngOnInit():void {
  }
}
