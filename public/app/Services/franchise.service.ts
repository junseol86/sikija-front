/**
 * Created by Hyeonmin on 2017-03-17.
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';


import 'rxjs/add/operator/toPromise';
import {FranchiseAndMore} from "../Models/Franchise";

@Injectable()
export class FranchiseService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private franchiseUrl = 'franchise';

  constructor(private http: Http) {  }

  // Array 형태일때는 response.json() 뒤에 .data를 붙이지 않는다.
  getFranchises(location: string, zone:string, category: string, offset: Number): Promise<FranchiseAndMore> {
    const url = `${this.franchiseUrl}/list/${location}/${zone}/${category}/${offset}`;
    return this.http.get(url)
      .toPromise()
      .then(response => new FranchiseAndMore(response.json().data.more, response.json().data.franchise))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
