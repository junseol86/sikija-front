import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Delivery } from '../Models/Delivery';
import { DeliveryAndMore } from '../Models/Delivery';

@Injectable()
export class DeliveryService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private deliveryUrl = 'backend/delivery';

  constructor(private http: Http) { }

  // Array 형태일때는 response.json() 뒤에 .data를 붙이지 않는다.
  getDeliveries(location: string, category: string, offset: Number): Promise<DeliveryAndMore> {
    const url = `${this.deliveryUrl}/list/${location}/${category}/${offset}`;
    return this.http.get(url)
      .toPromise()
      .then(response => new DeliveryAndMore(response.json().data.more, response.json().data.delivery))
      .catch(this.handleError);
  }


  getDelivery(id: number): Promise<Delivery> {
    const url = `${this.deliveryUrl}/view/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Delivery)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
