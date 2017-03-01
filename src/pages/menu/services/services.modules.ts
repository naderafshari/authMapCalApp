import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ChiroCarePage } from './chiro-care/chiro-care'

@NgModule({
	imports: [IonicModule],
	declarations: [
		ChiroCarePage
	],
	entryComponents: [
		ChiroCarePage
	]
})
export class ServicesModule {

}
