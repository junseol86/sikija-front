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
  links: string[]
}

export class RestaurantAndMore {
  more: Number;
  restaurants: Restaurant[];
  constructor(more:Number, restaurants: Restaurant[]) {
    this.more = more;
    this.restaurants = restaurants;
  }
}
