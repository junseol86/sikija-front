import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

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
    private deliveryService: DeliveryService,
    private router: Router
  ) { }

  getDeliveries(category: string): void {
    this.deliveryService
      .getDeliveries(category)
      .then(deliveries => this.deliveries = deliveries);
  }

  ngOnInit(): void {
    this.getDeliveries('all');
    $.getScript('/app/Scripts/0_app.js');
  }

  onSelect(delivery: Delivery) {
    this.selectedDelivery = delivery;
  }
}
