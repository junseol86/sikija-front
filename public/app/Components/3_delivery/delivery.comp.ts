import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Delivery, DeliveryAndMore, DeliveryState} from '../../Models/Delivery'
import { DeliveryService } from '../../Services/delivery.service'
import { Location } from '@angular/common'
import {SingletonService} from "../../Services/singleton.service";
import {FacebookService} from "../../Services/facebook.service";

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'delivery',
  templateUrl: './delivery.comp.html',
  styleUrls: ['../../Styles/3_delivery.css'],
})

export class DeliveryComponent implements OnInit {
  top_bar_menu_set: string = "btn_home";
  locationId: string = '';

  deliveryState: DeliveryState;

  sgtSvc = SingletonService.getInstance();
  fbService: FacebookService;

  constructor(
    private router: Router,
    private deliveryService: DeliveryService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private facebookService: FacebookService
  ) {
    this.fbService = facebookService;
  }

  ngOnInit(): void {

    // 페이스북 로그인
    this.fbService.fb_checkLogin();

    this.activatedRoute.params.subscribe((params: Params) => {
      // 속한 학교
      this.locationId = params['location'];

      this.deliveryState = this.sgtSvc.getDeliveryState();

      if (this.deliveryState.deliveries.length == 0)
        // 이 페이지에 처음 들어왔다면
        this.getDeliveries(this.locationId, this.deliveryState.categoryId);
      else {
        // 세부 페이지에 들어왔다가 나왔다면 이전 상태 로드
        $('#scroll_area').animate({
          scrollTop: this.deliveryState.scrollTo
        }, 300);
      }

      // 선택되어있는 카테고리 화면에 표시
      $('#' + this.deliveryState.categoryId).addClass('selected');

      // 화면 사이즈 조정
      $.getScript('/app/Scripts/_sizer.js');
    });
  }

  getDeliveries(location: string, category: string): void {
    this.deliveryService
      .getDeliveries(location, category, this.deliveryState.offset)
      .then(deliveryAndMore => this.afterDelService(deliveryAndMore));
  }
  afterDelService(deliveryAndMore: DeliveryAndMore) {
    this.deliveryState.isMore = deliveryAndMore.more;
    this.deliveryState.deliveries = this.deliveryState.deliveries.concat(deliveryAndMore.deliveries);
  }

  // 화면 맨 아래로 스크롤했을 때
  whenReachedBottom() {
    if (this.deliveryState.isMore > 0) {
      if($('#scroll_area').scrollTop() + $('#scroll_area').height() > $('#scroll_height').height() - 50) {
        this.deliveryState.offset++;
        this.getDeliveries(this.locationId, this.deliveryState.categoryId);
      }
    }
  }

  selectCategory(category: string):void {
    this.deliveryState.categoryChange(category);
    this.getDeliveries(this.locationId, this.deliveryState.categoryId);
    $('.selected').removeClass('selected');
    $('#' + this.deliveryState.categoryId).addClass('selected');
  }

  selectDelivery(id: string):void {

    // 다시 목록으로 돌아올 때 클릭한 곳으로 스크롤되도록 높이를 저장
    var offset:number = $('#update_notice').outerHeight();
    var proceed:boolean = true;
    $('.delivery_item').each(function (idx:number, obj:number) {
      if ($(obj).attr('id') != id.toString() && proceed) {
        offset += $(obj).outerHeight();
      } else {
        proceed = false;
      }
    });
    this.deliveryState.scrollTo = offset;

    this.router.navigate(['/delivery/' + this.locationId + '/view/' + id]);
  }

  linkTo(link: string) {
    window.open(link, '_blank');
  }

}
