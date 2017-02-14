import { Injectable } from '@angular/core';
import { Events } from "ionic-angular";
import { AngularFire, AuthMethods, AuthProviders, FirebaseAuthState } from 'angularfire2';
import { Facebook, GooglePlus, TwitterConnect } from 'ionic-native'
import { Loader } from './loader';
import { User } from './user';
import { AuthConfig } from '../app/config'
import * as firebase from 'firebase';

@Injectable()
export class AuthenticatorService {

  user: User;

  constructor(
    private events: Events,
    private af: AngularFire,
    private loader: Loader
  ) {}

  invalidateUser(): void {
    this.user = null;
  }

  // Set user in this singleton to be used thru the app
  setUser(user): void {
    this.user = new User(user.auth.uid);
  }

  // Get user in this singleton to be used thru the app
  getUser(): User {
    return this.user;
  }

  anonymousUser(): Promise<FirebaseAuthState> {
    var promise = new Promise<FirebaseAuthState>((resolve, reject) => {
      this.loader.show("Logging as Anonymous");
      this.af.auth.login({
        method: AuthMethods.Anonymous,
        provider: AuthProviders.Anonymous
      })
      .then((user) => {
        let userRef = this.af.database.object('/users/' + user.auth.uid);
        userRef.set({ provider: user.provider });
        this.loader.hide();
        this.events.publish('user:login', user);
        resolve(user);
      })
      .catch(e => {
        this.loader.hide();
        console.error(`Anonymous Login Failure:`, e)
        reject(e);
      });
    });
    return promise;
  }

  // BROWSER MODE ON
  // Use this to enable oAuth in browser - eg ionic serve
  // ---------------------------------------------------------
  signInWithOAuthBrowserMode(provider: string): Promise<FirebaseAuthState> {
    var promise = new Promise<any>((resolve, reject) => {
      this.loader.show(`Logging with ${provider} (Browser Mode)`);
      this.af.auth.login({
        method: AuthMethods.Popup,
        provider: (<any>AuthProviders)[provider]
      })
      .then((user) => {
        resolve(user);
        this.events.publish('user:login', user);
        this.loader.hide();
        this.saveUserDetails(user);
      })
      .catch(e => {
        this.loader.hide();
        console.error(`${provider} Login Failure:`, e)
        reject(e);
      });
    });
    return promise;
  }

  // BROWSER MODE OFF
  // oAuth using ionic-native plugins
  // Use this function instead of the one above to run this app on your phone
  signInWithOAuth(provider: string) {
    this.loader.show('oAuth signin...');
    switch(provider) {
      case "Google":
        return GooglePlus.login(
          {
            'scopes': '',
            'webClientId': AuthConfig.WEB_CLIENT_ID,
            'offline': true,
          }).then((result) => {
            let creds = firebase.auth.GoogleAuthProvider.credential(result.idToken);
            this.loader.hide();
            return this.oAuthWithCredential(provider, creds);
          })
          .catch((e) => {
            this.loader.hide();
            return Promise.reject(e);
          });
      case "Facebook":
        return Facebook.login(["email"]).then((result) => {
          let creds = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
          this.loader.hide();
          return this.oAuthWithCredential(provider, creds);
        })
        .catch((e) => {
          this.loader.hide();
          if (e.errorMessage) {
            return Promise.reject(e.errorMessage);
          } else {
            return Promise.reject(e);
          }
        });
      case "Twitter":
        return TwitterConnect.login().then((result) => {
          let creds = firebase.auth.TwitterAuthProvider.credential(result.token, result.secret);
          this.loader.hide();
          return this.oAuthWithCredential(provider, creds)
        })
        .catch((e) => {
          this.loader.hide();
          return Promise.reject(e);
        });
    }
  }

  // Perform login using user and password
  login(email: string, password: string) {
    var promise = new Promise<any>((resolve, reject) => {
      this.loader.show("Logging with Firebase email/password");
      this.af.auth.login({ email, password }, {
        method: AuthMethods.Password,
        provider: AuthProviders.Password
      })
      .then((user) => {
        this.loader.hide();
        this.events.publish('user:login', user);
        resolve(user);
      })
      .catch(e => {
        this.loader.hide();
        console.error(`Password Login Failure:`, e)
        reject(e);
      });
    });
    return promise;
  }

  // Reset password
  resetPassword(email) {
    var promise = new Promise<any>((resolve, reject) => {
      this.loader.show("Resetting your password");
      firebase.auth().sendPasswordResetEmail(email).
        then((result: any) => {
        this.loader.hide();
        this.events.publish('user:resetPassword', result);
        resolve();
      }).catch((e: any) => {
        this.loader.hide();
        reject(e);
      });
    });
    return promise;
  }

  private saveUserDetails(user: FirebaseAuthState): firebase.Promise<any> {
    let userRef = firebase.database().ref('users/' + user.auth.uid)
    return userRef.once('value', (data) => {
      if (data.val()) {
        return userRef.set({
          provider: user.provider,
          fullName: user.auth.displayName,
          email: user.auth.email,
          avatar: user.auth.photoURL,
        });
      } else {
        return userRef.update({
          email: user.auth.email,
          avatar: user.auth.photoURL,
        });
      }
    });
  }

  // Signin with credentials
  private oAuthWithCredential(provider: string, creds: any): Promise<any> {
    var promise = new Promise<any>((resolve, reject) => {
      this.loader.show('oAuth login...');
      this.af.auth.login(creds, {
        provider: (<any>AuthProviders)[provider],
        method: AuthMethods.OAuthToken
      })
      .then((user) => {
        this.saveUserDetails(user);
        this.events.publish('user:login', user);
        this.loader.hide();
        resolve(user);
      })
      .catch(e => {
        this.loader.hide();
        console.error(`${provider} Login Failure:`, e)
        reject(e);
      });
    });
    return promise;
  }
}
