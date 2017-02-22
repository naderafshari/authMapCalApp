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
  lat: any;
  lng: any;
  bounds = new google.maps.LatLngBounds();

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeMapPage');

    this.loadMap();
  }

  loadMap(){
    let options = {timeout: 10000, enableHighAccuracy: true};
    Geolocation.getCurrentPosition(options).then((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
    Geolocation.watchPosition().subscribe((position) => {
      let destLatLng = new google.maps.LatLng(this.lat+.005, this.lng);
      let mapOptions = {
        center: destLatLng,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(destLatLng);
      let currLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.addMarker(currLatLng);
      this.map.fitBounds(this.bounds);
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
    this.bounds.extend(marker.position);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
