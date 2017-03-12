import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { WordpressService } from './../wordpress.service';
import { WordpressItemPage } from '../item/wordpress.item.page';
import { Post } from '../models/post.model';
import { LoginPage } from '../../../authentication/login/login';
import { Menu } from '../../../menu/menu';
import { AuthenticatorService } from '../../../../providers/authenticator';

@Component({
	templateUrl: 'wordpress.list.html',
	providers: [WordpressService]
})
export class WordpressListPage implements OnInit {
	public posts: Post[];

	private wordpressService: WordpressService;
	private nav: NavController;
	private af: AngularFire;
	private authenticatorService: AuthenticatorService;

	constructor(wordpressService: WordpressService,
		        af: AngularFire, 
		    	authenticatorService: AuthenticatorService,
				nav: NavController) {
		this.wordpressService = wordpressService;
		this.af = af;
		this.authenticatorService = authenticatorService;
		this.nav = nav;
		// Verify if user is logged in
		this.af.auth.subscribe(user => {
			if (user) {
				//console.info("Authenticated - pushing menu");
				this.authenticatorService.setUser(user);
			} else {
				//console.info("User not logged in");
				this.authenticatorService.invalidateUser();
				this.nav.push(Menu);
				this.nav.push(LoginPage);
			}
		});
 	}

	ngOnInit(): void {
		this.wordpressService.getPosts()
			.subscribe(posts => {
				this.posts = posts;
			});
	}

	public itemTapped(item) {
		this.nav.push(WordpressItemPage, {
			item: item
		});
	}
}
