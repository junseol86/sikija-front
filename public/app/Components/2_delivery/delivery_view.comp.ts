import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Delivery } from '../../Models/Delivery'
import { DeliveryService } from '../../Services/delivery.service'

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'delivery',
  templateUrl: './delivery_view.comp.html',
  styleUrls: ['../../Styles/2_delivery.css'],
})

export class DeliveryViewComponent implements OnInit {
  top_bar_menu_set:string = "btn_back";
  delivery: Delivery;
  constructor(
    private deliveryService: DeliveryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    $.getScript('/app/Scripts/0_sizer.js');

    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getDelivery(id);

      $.getScript('/app/Scripts/0_sizer.js');
      $.getScript('/app/Scripts/0_image_processor.js');

    });
  }

  loadDeliveryScript(delivery: Delivery):void {
    this.delivery = delivery
    $.getScript('/app/Scripts/2_delivery.js');
  }

  getDelivery(id: number):void {
    this.deliveryService
      .getDelivery(id)
      .then(delivery => this.loadDeliveryScript(delivery))
  }

}
