import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-office-hours',
  templateUrl: 'office-hours.html'
})
export class OfficeHoursPage {
  officeHours: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.officeHours = [{Day: 'Monday',	    Open: '8:30 AM',	Close: '4:30 PM'},
                          {Day: 'Tuesday',	  Open: '8:30 AM',	Close: '4:30 PM'},
                          {Day: 'Wednesday',  Open: '8:30 AM',	Close: '4:30 PM'},
                          {Day: 'Thursday',	  Open: '8:30 AM',	Close: '4:30 PM'},
                          {Day: 'Friday',	    Open: '8:30 AM',	Close: '4:30 PM'},
                          {Day: 'Saturday',	  Open: 'By Appt.',	Close: 'By Appt.'},
                          {Day: 'Sunday',	    Open: 'Closed',	  Close: 'Closed'}
                         ];
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficeHoursPage');
  }

}
