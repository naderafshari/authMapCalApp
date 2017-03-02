import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChiroCarePage } from './chiro-care/chiro-care'
import { CorrectivePage } from './corrective-exercises/corrective'
import { OrthoticsPage } from './custom-orthotics/orthotics'
import { LifestylePage } from './lifestyle-advice/lifestyle'
import { MassagePage } from './massage-therapy/massage'
import { NutritionPage } from './nutritional-advice/nutrition'
import { ScreeningPage } from './spinal-screening/screening'

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
	public correctiveTapped() {
	this.navCtrl.push(CorrectivePage);
	}
	public orthoticsTapped() {
	this.navCtrl.push(OrthoticsPage);
	}
	public lifestyleTapped() {
	this.navCtrl.push(LifestylePage);
	}
	public massageTapped() {
	this.navCtrl.push(MassagePage);
	}
	public nutritionTapped() {
	this.navCtrl.push(NutritionPage);
	}
	public screeningTapped() {
	this.navCtrl.push(ScreeningPage);
	}
}