import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'
import { DictionaryService } from '../../Services/dictionary.service'
import {Franchise, FranchiseAndMore} from "../../Models/Franchise";
import { FranchiseService } from "../../Services/franchise.service"
import {SingletonService} from "../../Services/singleton.service";
import {LocationService} from "../../Services/location.service";

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'franchise',
  templateUrl: './franchise.comp.html',
  styleUrls: ['../../Styles/5_franchise.css'],
})

export class FranchiseComponent implements OnInit {
  top_bar_menu_set: string = "btn_home";
  locationId: string = '';
  regionId: string = '';

  offset = 0;
  isMore:Number = 2;
  zoneId: string = 'all';
  categoryId: string = 'all';
  franchises: Franchise[] = [];

  franCategories: string[] = null;
  zones: string[] = null;
  dictionary: DictionaryService;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dict: DictionaryService,
    private franchiseService: FranchiseService,
    private locationService: LocationService,
    private location: Location
  ) {
    this.dictionary = dict;
    this.zones = Object.keys(dict.franchiseZone);
    this.franCategories = Object.keys(dict.franCategory);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.locationId = params['location'];
      this.getFranchises(this.locationId, this.zoneId, this.categoryId);
      this.getRegion();

      $.getScript('/app/Scripts/_sizer.js');
    });

  }

  getFranchises(location: string, zone: string, category: string): void {
    this.franchiseService
      .getFranchises(location, zone, category, this.offset)
      .then(franchiseAndMore => this.afterResService(franchiseAndMore));
  }
  afterResService(franchiseAndMore: FranchiseAndMore) {
    this.isMore = franchiseAndMore.more;
    this.franchises = this.franchises.concat(franchiseAndMore.franchises);
  }

  // 학교가 속한 도시
  getRegion():void {
    this.locationService.getALocation(this.locationId).then(location => this.regionId = location.region);
  }

  selectZone():void {
    this.isMore = 2;
    this.offset = 0;
    this.franchises = [];
    this.zoneId = $('#zone_select').val();
    this.getFranchises(this.locationId, this.zoneId, this.categoryId);
  }

  selectCategory():void {
    this.isMore = 2;
    this.offset = 0;
    this.franchises = [];
    this.categoryId = $('#category_select').val();

    this.getFranchises(this.locationId, this.zoneId, this.categoryId);
  }

  // 화면 맨 아래로 스크롤했을 때
  whenReachedBottom() {
    if (this.isMore > 0) {
      if($('#scroll_area').scrollTop() + $('#scroll_area').height() > $('#scroll_height').height() - 50) {
        this.offset++;
        this.getFranchises(this.locationId, this.zoneId, this.categoryId);
      }
    }
  }

  linkTo(link: string) {
    window.open(link, '_blank');
  }

  callNumber(number: string): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href='tel:' + number.replace('-', '');
    } else {
      alert('전화번호는 ' + number + ' 입니다.');
    }
  }

}
