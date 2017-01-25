import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Delivery } from '../../Models/Delivery'
import { DeliveryService } from '../../Services/delivery.service'

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'delivery',
  templateUrl: './delivery.comp.html',
  styleUrls: ['../../Styles/2_delivery.css'],
})

export class DeliveryComponent implements OnInit {
  deliveries: Delivery[];
  selectedDelivery: Delivery;

  constructor(
    private router: Router,
    private deliveryService: DeliveryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let category = params['category'];
      this.getDeliveries(category);
      $('.selected').removeClass('selected');
      $('#' + category).addClass('selected');

      $.getScript('/app/Scripts/0_sizer.js');
    });
  }

  getDeliveries(category: string): void {
    this.deliveryService
      .getDeliveries(category)
      .then(deliveries => this.deliveries = deliveries);
  }


  selectCategory(category: string):void {
    this.router.navigate(['/delivery/' + category])

  }

  onSelect(delivery: Delivery) {
    this.selectedDelivery = delivery;
  }
}
