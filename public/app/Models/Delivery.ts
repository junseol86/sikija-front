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
  desc: string;
}

export class DeliveryAndMore {
  more: Number;
  deliveries: Delivery[];
  constructor(more:Number, deliveries: Delivery[]) {
    this.more = more;
    this.deliveries = deliveries;
  }
}
