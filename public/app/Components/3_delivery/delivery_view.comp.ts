import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Delivery } from '../../Models/Delivery'
import { DeliveryService } from '../../Services/delivery.service'

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'delivery',
  templateUrl: './delivery_view.comp.html',
  styleUrls: ['../../Styles/3_delivery.css'],
})

export class DeliveryViewComponent implements OnInit {
  top_bar_menu_set:string = "btn_back";
  delivery: Delivery;
  constructor(
    private deliveryService: DeliveryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    $.getScript('/app/Scripts/_sizer.js');

    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getDelivery(id);

      $.getScript('/app/Scripts/_sizer.js');
      $.getScript('/app/Scripts/_image_processor.js');

    });
  }

  // 서비스 요소가 로드된 후에 나타나는 요소는 다음과 같이 처리하여 스크립트가 동작하도록 한다.
  loadDeliveryScript(delivery: Delivery):void {
    this.delivery = delivery
    $.getScript('/app/Scripts/3_delivery.js');
  }

  getDelivery(id: number):void {
    this.deliveryService
      .getDelivery(id)
      .then(delivery => this.loadDeliveryScript(delivery))
  }

  callNumber(number: string): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href='tel:' + number.replace('-', '');
    } else {
      alert('전화번호는 ' + number + ' 입니다.');
    }
  }

}
