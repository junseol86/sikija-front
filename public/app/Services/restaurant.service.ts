import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Restaurant, RestaurantDetail} from '../Models/Restaurant';
import { RestaurantAndMore } from '../Models/Restaurant';

@Injectable()
export class RestaurantService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private restaurantUrl = 'restaurant';

  constructor(private http: Http) { }

  // Array 형태일때는 response.json() 뒤에 .data를 붙이지 않는다.
  getRestaurants(location: string, dong:string, category: string, offset: Number): Promise<RestaurantAndMore> {
    const url = `${this.restaurantUrl}/list/${location}/${dong}/${category}/${offset}`;
    return this.http.get(url)
      .toPromise()
      .then(response => new RestaurantAndMore(response.json().data.more, response.json().data.restaurant))
      .catch(this.handleError);
  }


  getRestaurant(id: number): Promise<RestaurantDetail> {
    const url = `${this.restaurantUrl}/view/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as RestaurantDetail)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
