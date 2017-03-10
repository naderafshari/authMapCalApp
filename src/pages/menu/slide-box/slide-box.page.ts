import { Component } from '@angular/core';

@Component({
	templateUrl: 'slide-box.html'
})
export class SlideBoxPage {
	public items: any[];

	constructor() {
		this.items = this.generateItems(34);   //set the parameter to the number of files in the folder, the bash script provides count
	}

	private generateItems(n: number): any {
		let items = [];

		for (let i = 1; i < n+1; i++) {
			items.push({
				image: "./assets/img/slideshow/slide" + i
			});	
		}

/*
        items.push({image: "./assets/img/slideshow/slide1"});
        items.push({image: "./assets/img/slideshow/slide2"});

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
