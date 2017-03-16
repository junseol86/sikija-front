/**
 * Created by Hyeonmin on 2017-02-17.
 */
export class Restaurant {
  _id: string;
  id: Number;
  category: string[];
  region: string;
  dong: string;
  name: string;
  links: string[];
}

export class RestaurantDetail {
  _id: string;
  id: Number;
  category: string[];
  region: string;
  dong: string;
  name: string;
  links: string[];
  link_n_title: Object[];
}

export class RestaurantAndMore {
  more: Number;
  restaurants: Restaurant[];
  constructor(more:Number, restaurants: Restaurant[]) {
    this.more = more;
    this.restaurants = restaurants;
  }
}

export class RestaurantForDashboard {
  _id: string;
  id: Number;
  image: string;
  desc: string;
}

export class RestaurantState {
  offset = 0;
  isMore:Number = 2;
  dongId: string = 'all';
  categoryId: string = 'all';
  restaurants: Restaurant[] = [];
  scrollTo: number = null;
  dongChange(dong: string) {
    this.isMore = 2;
    this.offset = 0;
    this.restaurants = [];
    this.dongId = dong;
  }
  categoryChange(category: string) {
    this.isMore = 2;
    this.offset = 0;
    this.restaurants = [];
    this.categoryId = category;
  }

}
