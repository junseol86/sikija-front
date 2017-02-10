import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Delivery, DeliveryAndMore} from '../../Models/Delivery'
import { DeliveryService } from '../../Services/delivery.service'

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'delivery',
  templateUrl: './delivery.comp.html',
  styleUrls: ['../../Styles/3_delivery.css'],
})

export class DeliveryComponent implements OnInit {
  offset = 0;
  isMore:Number = 1;
  locationId: string = '';
  categoryId: string = '';
  top_bar_menu_set: string = "btn_home";
  deliveries: Delivery[] = [];

  constructor(
    private router: Router,
    private deliveryService: DeliveryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.locationId = params['location'];
      this.categoryId = params['category'];
      this.getDeliveries(this.locationId, this.categoryId);
      $('.selected').removeClass('selected');
      $('#' + this.categoryId).addClass('selected');

      $.getScript('/app/Scripts/_sizer.js');
    });
  }

  getDeliveries(location: string, category: string): void {
    this.deliveryService
      .getDeliveries(location, category, this.offset)
      .then(deliveryAndMore => this.afterDelService(deliveryAndMore));
  }

  afterDelService(deliveryAndMore: DeliveryAndMore) {
    this.isMore = deliveryAndMore.more;
    this.deliveries = this.deliveries.concat(deliveryAndMore.deliveries);
  }

  whenReachedBottom() {
    if (this.isMore == 1) {
      if($('#scroll_area').scrollTop() + $('#scroll_area').height() == $('#scroll_height').height()) {
        this.offset++;
        this.getDeliveries(this.locationId, this.categoryId);
      }
    }
  }

  selectCategory(category: string):void {
    this.isMore = 1;
    this.offset = 0;
    this.deliveries = [];
    this.router.navigate(['/delivery/' + this.locationId + '/' + category]);
  }

  selectDelivery(id: string):void {
    this.router.navigate(['/delivery/' + this.locationId + '/view/' + id]);
  }

}
