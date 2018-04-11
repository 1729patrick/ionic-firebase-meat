import { AuthProvider } from '../../providers/auth/auth';
import { CartPage } from '../cart/cart';
import { CartService } from '../../providers/cart/cart.service';
import { Component } from '@angular/core';
import { MenuPage } from '../menu/menu';
import { NavParams, NavController, ToastController } from 'ionic-angular';
import { RestaurantService } from '../../providers/restaurant/restaurants.service';
import { RestaurantDetailPage } from '../restaurant-detail/restaurant-detail';
import { ReviewsPage } from '../reviews/reviews';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {
    total: number = 0;
    restaurantName: string;

    restaurantParams: {
        id: string;
    }

    restaurantRoot = RestaurantDetailPage;
    menuRoot = MenuPage;
    reviewsRoot = ReviewsPage;

    constructor(
        public authProvider: AuthProvider,
        public cartService: CartService,
        public navCtrl: NavController,
        public navParams: NavParams,
        public restaurantService: RestaurantService,
        public storage: Storage,
        public toastCtrl: ToastController) {
            this.restaurantParams = {
                id: this.navParams.get('id'),  //id recebe o id passado pelo restaurant
            }
            this.restaurantName = this.navParams.get('restaurantName');
        }

        ionViewCanEnter():any { //retorna true se o usuário está logado
            return this.authProvider.userIsLogged();

        }

        pushCart(): void {
            this.navCtrl.push(CartPage)
        }

    }
