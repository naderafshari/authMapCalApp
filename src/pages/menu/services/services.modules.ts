import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ChiroCarePage } from './chiro-care/chiro-care'
import { CorrectivePage } from './corrective-exercises/corrective'
import { OrthoticsPage } from './custom-orthotics/orthotics'
import { LifestylePage } from './lifestyle-advice/lifestyle'
import { MassagePage } from './massage-therapy/massage'
import { NutritionPage } from './nutritional-advice/nutrition'
import { ScreeningPage } from './spinal-screening/screening'

@NgModule({
	imports: [IonicModule],
	declarations: [
		ChiroCarePage,
        CorrectivePage,
        OrthoticsPage,
        LifestylePage,
        MassagePage,
        NutritionPage,
        ScreeningPage
	],
	entryComponents: [
		ChiroCarePage,
        CorrectivePage,
        OrthoticsPage,
        LifestylePage,
        MassagePage,
        NutritionPage,
        ScreeningPage
	]
})
export class ServicesModule {

}
