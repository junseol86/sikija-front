/**
 * Created by Hyeonmin on 2017-03-04.
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Job} from '../Models/Job';

@Injectable()
export class JobService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private jobUrl = '/dashboard/jobs/@';

  constructor(private http: Http) { }

  getJobs(regionCode: string): Promise<Job[]> {
    const url = this.jobUrl.replace('@', regionCode);
    // const url = '/location/list';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Job[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
