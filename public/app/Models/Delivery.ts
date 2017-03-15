/**
 * Created by Hyeonmin on 2017-01-14.
 */
export class Delivery {
  _id: string;
  id: Number;
  category: string[];
  locations: Number[];
  name: string;
  phone: string[];
  leaflet: string[];
  desc: Object;
}

export class DeliveryAndMore {
  more: Number;
  deliveries: Delivery[];
  constructor(more:Number, deliveries: Delivery[]) {
    this.more = more;
    this.deliveries = deliveries;
  }
}

export class DeliveryState {
  offset = 0;
  isMore:Number = 2;
  categoryId: string = 'all';
  deliveries: Delivery[] = [];
  scrollTo: number = null;
}
