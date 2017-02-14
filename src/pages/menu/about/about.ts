import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthenticatorService } from "../../../providers/authenticator";
import { Loader } from '../../../providers/loader';
import { User } from "../../../providers/user";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild(Content) content: Content;

  userDetails: User;
  chatControl: any;

  messages: FirebaseListObservable<any[]>;
  message: string = '';

  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    private loader: Loader,
    private formBuilder: FormBuilder,
    private authenticatorService: AuthenticatorService
  ) {
    // Get messages and join with user details
    this.messages = <FirebaseListObservable<any>> af.database.list('messages', {
      query: { limitToLast: 5, orderByKey: true }
    });
  }

  sendMessage() {
    console.debug("sending message to chat " + this.constructor.name);
    this.af.database.list('/messages')
    .push({
      fullName: this.userDetails.fullName,
      provider: this.userDetails.provider,
      avatar: this.userDetails.avatar,
      userUid: this.userDetails.uid,
      value: this.message
    });
    this.message = '';
  }

  ionViewDidLoad() {
    this.messages.subscribe(() => {
      setTimeout(() => this.content.scrollToBottom(500), 250);
    });
  }

  ionViewWillLoad() {
    this.chatControl = this.formBuilder.group({
      message: ['', Validators.required]
    });
    this.userDetails = new User(this.authenticatorService.getUser().uid);
  }

  logout() {
    this.af.auth.logout();
    this.navCtrl.pop();
  }
}
