/**
 * Created by Hyeonmin on 2017-03-17.
 */

export class Franchise {
  _id: string;
  id: Number;
  location: Number;
  zone: string;
  category: string;
  name: string;
  phone: string;
  desc: string[];
}

// 리스트에서 더 받아올 페이지가 있는지를 확인하기 위한 인스턴스
export class FranchiseAndMore {
  more: Number;
  franchises: Franchise[];
  constructor(more:Number, franchises: Franchise[]) {
    this.more = more;
    this.franchises = franchises;
  }
}
