import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Delivery } from '../../Models/Delivery'
import { DeliveryService } from '../../Services/delivery.service'

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'delivery',
  templateUrl: './delivery.comp.html',
  styleUrls: ['../../Styles/3_delivery.css'],
})

export class DeliveryComponent implements OnInit {
  top_bar_menu_set:string = "btn_home";
  deliveries: Delivery[];

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

      $.getScript('/app/Scripts/_sizer.js');
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

  selectDelivery(id: string):void {
    this.router.navigate(['/delivery/view/' + id])
  }

}
