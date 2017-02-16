import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { AboutPage } from './about/about';
import { SettingsPage } from './settings/settings';
import { LoginPage } from '../authentication/login/login';
import { HomePage } from './home/home.page';
import { HomeMapPage } from './home-map/home-map';
import { WordpressListPage } from './wordpress/list/wordpress.list.page';
import { SlideBoxPage } from './slide-box/slide-box.page';
import { GoogleMapsPage } from './google-maps/google-maps.page';
import { ComponentsListPage } from './components/list/components.list.page';

@Component({
  templateUrl: 'menu.html'
})
export class Menu {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private af: AngularFire
  ) {
    // Add your pages to be displayed in the menu
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'WordPress', component: WordpressListPage },
      { title: 'SlideBox', component: SlideBoxPage },
      { title: 'GoogleMap', component: GoogleMapsPage },
      { title: 'Current Location', component: HomeMapPage },
      { title: 'Components', component: ComponentsListPage },
      { title: 'About', component: AboutPage },
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
    this.nav.setRoot(LoginPage);
  }
}
