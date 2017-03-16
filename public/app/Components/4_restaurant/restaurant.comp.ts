import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'
import { DictionaryService } from '../../Services/dictionary.service'
import {Restaurant, RestaurantAndMore, RestaurantState} from "../../Models/Restaurant";
import { RestaurantService } from "../../Services/restaurant.service"
import {SingletonService} from "../../Services/singleton.service";

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'restaurant',
  templateUrl: './restaurant.comp.html',
  styleUrls: ['../../Styles/4_restaurant.css'],
})

export class RestaurantComponent implements OnInit {
  top_bar_menu_set: string = "btn_home";
  locationId: string = '';
  regionId: string = '';

  resCategories: string[] = null;
  dongs: string[] = null;
  dictionary: DictionaryService;

  restaurantState: RestaurantState;

  sgtSvc = SingletonService.getInstance();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dict: DictionaryService,
    private restaurantService: RestaurantService,
    private location: Location
  ) {
    this.dictionary = dict;
    this.dongs = Object.keys(dict.dong);
    this.resCategories = Object.keys(dict.resCategory);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.locationId = params['location'];
      this.restaurantState = this.sgtSvc.getRestaurantState();
      if (this.restaurantState.restaurants.length == 0)
        this.getRestaurants(this.locationId, this.restaurantState.dongId, this.restaurantState.categoryId);
      else {
        $('#scroll_area').animate({
          scrollTop: this.restaurantState.scrollTo
        }, 300);
      }

      $.getScript('/app/Scripts/_sizer.js');
    });

  }

  getRestaurants(region: string, dong: string, category: string): void {
    this.restaurantService
      .getRestaurants(region, dong, category, this.restaurantState.offset)
      .then(restaurantAndMore => this.afterResService(restaurantAndMore));
  }

  afterResService(restaurantAndMore: RestaurantAndMore) {
    this.restaurantState.isMore = restaurantAndMore.more;
    this.restaurantState.restaurants = this.restaurantState.restaurants.concat(restaurantAndMore.restaurants);
  }

  whenReachedBottom() {
    if (this.restaurantState.isMore > 0) {
      if($('#scroll_area').scrollTop() + $('#scroll_area').height() > $('#scroll_height').height() - 50) {
        this.restaurantState.offset++;
        this.getRestaurants(this.locationId, this.restaurantState.dongId, this.restaurantState.categoryId);
      }
    }
  }

  selectDong():void {
    this.restaurantState.dongChange($('#dong_select').val());
    this.getRestaurants(this.locationId, this.restaurantState.dongId, this.restaurantState.categoryId);
  }

  selectCategory():void {
    this.restaurantState.categoryChange($('#category_select').val());

    this.getRestaurants(this.locationId, this.restaurantState.dongId, this.restaurantState.categoryId);
  }

  selectRestaurant(id: string):void {

    // 다시 목록으로 돌아올 때 클릭한 곳으로 스크롤되도록 높이를 저장
    var offset:number = $('#update_notice').outerHeight();
    var proceed:boolean = true;
    $('.restaurant_item').each(function (idx:number, obj:number) {
      if ($(obj).attr('id') != id.toString() && proceed) {
        offset += $(obj).outerHeight();
      } else {
        proceed = false;
      }
    });
    this.restaurantState.scrollTo = offset;

    this.router.navigate(['/restaurant/view/' + id]);
  }

  linkTo(link: string) {
    window.open(link, '_blank');
  }

}
