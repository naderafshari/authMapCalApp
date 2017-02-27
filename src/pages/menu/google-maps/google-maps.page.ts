import { Component } from '@angular/core';

import { IMarker, IPoint } from './interfaces';

@Component({
	templateUrl: 'google-maps.html'
})
export class GoogleMapsPage {
	public markers: IMarker[];
	public origin: IPoint;
	public zoom: number;

	constructor() {
		this.initMarkers();
		this.origin = {
			lat: 33.754978, 
			lng: -118.308638
		};
		this.zoom = 13;
	}

	public clickedMarker(label: string) {
		window.alert(`clicked the marker: ${label || ''}`);
	}

	private initMarkers(): void {
		this.markers = [{
			lat: 33.754978,
			lng: -118.308638,
			label: 'A'
		}];
	}
}
