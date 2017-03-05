/**
 * Created by Hyeonmin on 2017-03-04.
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Job} from '../Models/Job';
import {RestaurantForDashboard} from "../Models/Restaurant";

@Injectable()
export class DashboardService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getJobs(): Promise<Job[]> {
    var jobUrl = '/dashboard/jobs';
    return this.http.get(jobUrl)
      .toPromise()
      .then(response => response.json() as Job[])
      .catch(this.handleError);
  }

  getRestaurants(): Promise<RestaurantForDashboard[]> {
    var restaurantUrl = '/dashboard/restaurants';
    return this.http.get(restaurantUrl)
      .toPromise()
      .then(response => response.json() as RestaurantForDashboard[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
