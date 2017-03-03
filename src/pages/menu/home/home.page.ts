import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

//import { WordpressListPage } from '../wordpress/list/wordpress.list.page';
//import { SlideBoxPage } from '../slide-box/slide-box.page';
import { ServicesPage } from '../services/services';
import { GoogleMapsPage } from '../google-maps/google-maps.page';
import { AboutPage } from '../about/about';
import { OfficeHoursPage } from '../office-hours/office-hours'

import { Tile } from './models/tile.model';
import { EmailService } from '../../../services/email.service';
import { CallService } from '../../../services/call.service';
import { MapsService } from '../../../services/maps.service';
import { InAppBrowserService } from '../../../services/in-app-browser.service';
import { data } from './home-data';

@Component({
	templateUrl: 'home.html',
	providers: []
})
export class HomePage {
	public tiles: Tile[][];

	private emailService: EmailService;
	private callService: CallService;
	private mapsService: MapsService;
	private browserService: InAppBrowserService;
	private nav: Nav;

	constructor(
		emailService: EmailService,
		callService: CallService,
		mapsService: MapsService,
		browserService: InAppBrowserService,
		nav: Nav
	) {
		this.emailService = emailService;
		this.callService = callService;
		this.mapsService = mapsService;
		this.browserService = browserService;
		this.nav = nav;
		this.initTiles();
	}

	public navigateTo(tile) {
		this.nav.setRoot(tile.component);
	}

	public getDirections() {
		this.mapsService.openMapsApp(data.officeLocation);
	}

	public sendEmail() {
		this.emailService.sendEmail(data.email);
	}

	public openFacebookPage() {
		this.browserService.open(data.facebook);
	}

	public openInstagramPage() {
		this.browserService.open(data.instagram);
	}

	public callUs() {
		this.callService.call(data.phoneNumber);
	}

	private initTiles(): void {
		this.tiles = [[{
			title: 'Services',
			path: 'services',
			icon: 'body',
			component: ServicesPage
		}, {
			title: 'About',
			path: 'about',
			icon: 'help',
			component: AboutPage
		}], [{
			title: 'Map',
			path: 'map',
			icon: 'map',
			component: GoogleMapsPage
		}, {
			title: 'Office Hours',
			path: 'office-hours',
			icon: 'clock',
			component: OfficeHoursPage
		}]];
	}
}
