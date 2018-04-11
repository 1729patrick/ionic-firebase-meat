import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,IonicPage, AlertController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { LoginPage } from '../login/login';
import { Restaurant } from'../../providers/restaurant/restaurant.model';
import { RestaurantService } from '../../providers/restaurant/restaurants.service';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { WelcomePage } from '../welcome/welcome';


@IonicPage()
@Component({
    selector: 'page-restaurants',
    templateUrl: 'restaurants.html',
})
export class RestaurantsPage {
    restaurants: Restaurant[]; //variavel restaurants do tipo Restaurant de restaurant.model
    userLogged: boolean;

    constructor(
        public authProvider: AuthProvider,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public notificationProvider: NotificationProvider,
        public restaurantService: RestaurantService,
        public storage: Storage,
        public toastCtrl: ToastController) {

            this.restaurantService.showRestaurants()
            .subscribe(restaurants => {
                this.restaurants = restaurants; //para pegar os valor do arquivo json e salvar na variavel restaurants
            },
            error => {
                console.log(error);
            });

            storage.get('token').then((data) => { //se o usuário estiver logado, lista de restaurante será a homepage
                if(data) {
                    this.userLogged =  true;
                }else {
                    this.userLogged =  false;
                }
            });
    }

    restaurantDetail(id, name): void {
        this.navCtrl.push(TabsPage, { //passa o id e o nome do restaurant do restaurante selecionado por parametro para a tab
            'id': id,
            'restaurantName': name
        });
    }

    pushLogin(): void {
        this.navCtrl.setRoot(LoginPage)
    }

    logout(): void {
        //this.notificationProvider.confirmExit();
        let alert = this.alertCtrl.create({
        title: 'Logout',
        message: 'Tem certeza que quer sair?',
        buttons: [
            {
                text: 'Sair',
                handler: () => {
                    this.authProvider.logout();
                    this.navCtrl.setRoot(WelcomePage);
                }
            }
        ]
    });
    alert.present();
    alert.setMode("ios");
}

}
