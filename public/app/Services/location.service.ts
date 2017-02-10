/**
 * Created by Hyeonmin on 2017-02-02.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Location } from '../Models/Location';

@Injectable()
export class LocationService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private locationUrl = 'location';

  constructor(private http: Http) { }

  // Array 형태일때는 response.json() 뒤에 .data를 붙이지 않는다.
  getLocations(): Promise<Location[]> {
    const url = `${this.locationUrl}/list`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Location[])
      .catch(this.handleError);
  }

  getALocation(id: string): Promise<Location> {
    const url = `${this.locationUrl}/view/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Location)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
