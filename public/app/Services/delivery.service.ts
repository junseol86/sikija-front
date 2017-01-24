import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Delivery } from '../Models/Delivery';

@Injectable()
export class DeliveryService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private deliveryUrl = 'delivery';

  constructor(private http: Http) { }

  // Array 형태일때는 response.json() 뒤에 .data를 붙이지 않는다.
  getDeliveries(category: string): Promise<Delivery[]> {
    const url = `${this.deliveryUrl}/list/${category}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Delivery[])
      .catch(this.handleError);
  }


  getDelivery(id: number): Promise<Delivery> {
    const url = `${this.deliveryUrl}/${id}`;
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
