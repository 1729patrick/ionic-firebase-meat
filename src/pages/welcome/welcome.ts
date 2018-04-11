
import { AuthProvider } from '../../providers/auth/auth';import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RestaurantsPage } from '../restaurants/restaurants';
import { SignupPage } from '../signup/signup';


@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {

    constructor(
        public authProvider: AuthProvider,
        public navCtrl: NavController,
        public navParams: NavParams) { }

        pushHome(): void {
            this.navCtrl.setRoot(RestaurantsPage);
        }

        pushLogin():void {
            this.navCtrl.setRoot(LoginPage);
        }

        pushSignUp():void {
            this.navCtrl.setRoot(SignupPage);
        }
    }
