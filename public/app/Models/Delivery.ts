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

// 리스트에서 더 받아올 페이지가 있는지를 확인하기 위한 인스턴스
export class DeliveryAndMore {
  more: Number;
  deliveries: Delivery[];
  constructor(more:Number, deliveries: Delivery[]) {
    this.more = more;
    this.deliveries = deliveries;
  }
}

// 리스트에서 상세로 들어갔다가 돌아올 때 페이지 등을 유지하기 위한 인스턴스
export class DeliveryState {
  offset = 0;
  isMore:Number = 2;
  categoryId: string = 'all';
  deliveries: Delivery[] = [];
  scrollTo: number = null;
  categoryChange(category: string):void {
    this.offset = 0;
    this.isMore = 2;
    this.deliveries = [];
    this.categoryId = category;
  }
}
