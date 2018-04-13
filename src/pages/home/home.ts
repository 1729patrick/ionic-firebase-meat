import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {


    constructor(
        public navCtrl: NavController) { }

        pushRestaurants(): void {
            this.navCtrl.setRoot('RestaurantsPage');
        }

        pushLogin():void {
            this.navCtrl.setRoot('LoginPage');
        }

        pushSignUp():void {
            this.navCtrl.setRoot('SignupPage');
        }

    }
