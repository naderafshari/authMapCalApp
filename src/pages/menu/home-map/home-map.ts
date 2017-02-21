import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

/*
  Generated class for the HomeMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var google;

@Component({
  selector: 'page-home-map',
  templateUrl: 'home-map.html'
})
export class HomeMapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeMapPage');
    this.loadMap();
  }

  loadMap(){

    Geolocation.watchPosition().subscribe((position) => {
  
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      this.addMarker(latLng);
      
      let latLng2 = new google.maps.LatLng(position.coords.latitude+1, position.coords.longitude);

      this.addMarker(latLng2);
      
    }, (err) => {
      console.log(err);
    });
   }

  addMarker(latLng){
  
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  
    let content = "<h4>Information!</h4>";          
  
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
  
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

/*
moveMarker()
{
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://x.com/x13/?testloc=1",false);
    xmlhttp.send();

    var data = xmlhttp.responseText;
    vals = data.split(',');
    latv = parseFloat(vals[0]);
    lonv = parseFloat(vals[1]);
    myLatlng = new google.maps.LatLng(latv,lonv);

    var fld = document.getElementById('before_map');
    fld.innerText = ' ' + 'lat:' + latv + ', lon: ' + lonv + ' ' + myLatlng.toString();
    marker.setPosition = myLatlng;
}
*/


}
