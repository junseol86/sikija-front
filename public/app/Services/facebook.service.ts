/**
 * Created by Hyeonmin on 2017-03-19.
 */

declare const FB:any;

export class FacebookService {
  loggedIn:boolean = false;

  init():void {
    FB.init({
      appId      : '898278946975693',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });
  }

  fb_login() {
    FB.login((response:any) => {
      this.afterCheckingLogin(response);
    });
  }

  fb_checkLogin() {
    FB.getLoginStatus((response:any) => {
      this.afterCheckingLogin(response);
    });
  }

  fb_logout() {
    FB.logout((response:any) => {
      this.afterCheckingLogin(response);
    })
  }

  afterCheckingLogin(response:any) {
    console.log(response);
    this.loggedIn = response.status != 'unknown' ? true : false;
  }


}
