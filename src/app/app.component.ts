import { Component, ViewChild } from '@angular/core';
import { App, Events, Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { AngularFire } from 'angularfire2';

import { HomePage } from '../pages/menu/home/home.page';
import { WordpressListPage } from '../pages/user/wordpress/list/wordpress.list.page';
import { SlideBoxPage } from '../pages/menu/slide-box/slide-box.page';
import { GoogleMapsPage } from '../pages/menu/google-maps/google-maps.page';
import { ComponentsListPage } from '../pages/menu/components/list/components.list.page';
// Root pages to be used based on authentication
import { Menu } from '../pages/menu/menu';
import { LoginPage } from '../pages/authentication/login/login';

// Authenticator
import { AuthenticatorService } from '../providers/authenticator';


@Component({
	templateUrl: 'app.html',
	template: `<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>`,
	providers: [AuthenticatorService]
})
export class MyApp {
	pages;
	rootPage;

	@ViewChild(Nav) nav: Nav;

	constructor(private events: Events, 
	            private af: AngularFire, 
		    	private authenticatorService: AuthenticatorService,
		        private app: App, 
		        platform: Platform, 
		        private menu: MenuController) {
				    this.menu = menu;
					this.app = app;
					this.af = af;

					// set our app's pages
					this.pages = [
						{ title: 'Home', component: HomePage, icon: 'home' },
						{ title: 'Login', component: LoginPage, icon: 'login' },
						{ title: 'Wordpress', component: WordpressListPage, icon: 'logo-wordpress' },
						{ title: 'Slides', component: SlideBoxPage, icon: 'swap' },
						{ title: 'Google maps', component: GoogleMapsPage, icon: 'map' },
						{ title: 'Components', component: ComponentsListPage, icon: 'grid' }
					];

					platform.ready().then(() => {
						// Okay, so the platform is ready and our plugins are available.
						// Here you can do any higher level native things you might need.
						StatusBar.styleDefault();
/*
						// Verify if user is logged in
						this.af.auth.subscribe(user => {
							if (user) {
								console.info("Authenticated - pushing menu");
								authenticatorService.setUser(user);
								this.rootPage = Menu;
							} else {
								console.info("User not logged in");
								authenticatorService.invalidateUser();
								this.rootPage = LoginPage;
							}
						});

						// Available events for Authentication
						this.events.subscribe('user:login', user => {
							console.info("This was trigger by the user:login event.");
						});

						this.events.subscribe('user:create', user => {
							console.info("This was trigger by the user:create event.");
						});

						this.events.subscribe('user:resetPassword', user => {
							console.info("This was trigger by the user:resetPassword event.");
						});
*/
						//go to menu page for now
						this.rootPage = Menu;
					});
		       }

    openPage(page) {
	    this.menu.close();
	    this.nav.setRoot(page.component);
    }
}
