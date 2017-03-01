import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChiroCarePage } from './chiro-care/chiro-care'

@Component({
	templateUrl: 'services.html'
})
export class ServicesPage {
	constructor(
		private navCtrl: NavController
	) {
	}

	public chiroCareTapped() {
		this.navCtrl.push(ChiroCarePage);
	}

}