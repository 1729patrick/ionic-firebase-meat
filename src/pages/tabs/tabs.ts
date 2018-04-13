import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {
    restaurantName: string;

    restaurantParams: {
        id: string;
    }

    restaurantRoot = 'RestaurantDetailPage';
    menuRoot = 'MenuPage';
    reviewsRoot = 'ReviewsPage';


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public authService: AuthService) {
            this.restaurantParams = {
                id: this.navParams.get('id'),  //id recebe o id passado pelo restaurant
            }
            this.restaurantName = this.navParams.get('restaurantName');


        }

        ionViewCanEnter():any { //retorna true se o usuário está logado

            return this.authService.userIsLogged();
        }

        pushCart(): void {
            this.navCtrl.push('CartPage')
        }



    }
