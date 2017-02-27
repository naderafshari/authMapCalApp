import { Component } from '@angular/core';

@Component({
	templateUrl: 'slide-box.html'
})
export class SlideBoxPage {
	public items: any[];

	constructor() {
		this.items = this.generateItems(7);
	}

	private generateItems(n: number): any {
		let items = [];
        items.push({image: "./assets/img/logosm.png"});
        items.push({image: "./assets/img/kids_pic.jpg"});
        items.push({image: "./assets/img/str-120.jpg"});
        items.push({image: "./assets/img/logo.png"});
/*
		for (let i = 0; i < n; i++) {
			items.push({
				//image: 'http://lorempixel.com/g/786/1024/' + i + '/'
				image: 'http://lorempixel.com/400/200/sports/' + i + '/'
			});
		}
*/
		return items;
	}
}
