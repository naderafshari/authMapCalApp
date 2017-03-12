import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
//import { LoginPage } from '../authentication/login/login';
import { HomePage } from '../menu/home/home.page';
import { WordpressListPage } from './wordpress/list/wordpress.list.page';
import { SettingsPage } from './settings/settings';

@Component({
  templateUrl: 'user-menu.html'
})
export class Menu {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WordpressListPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private af: AngularFire
  ) {
    // Add your pages to be displayed in the menu
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'WordPress', component: WordpressListPage },
      { title: 'Settings', component: SettingsPage }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.af.auth.logout();
    this.nav.setRoot(HomePage);
  }
}
