import { Component } from '@angular/core';
import { NavController,IonicPage, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
    selector: 'page-restaurants',
    templateUrl: 'restaurants.html',
})
export class RestaurantsPage {
    restaurants: any; //variavel restaurants do tipo Restaurant de restaurant.model
    userLogged: boolean;

    constructor(
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public notificationService: NotificationService,
        public storage: Storage,
        public restaurantService: RestaurantService,
        public authService: AuthService) {

            this.restaurantService.getRestaurants("restaurants").then((data) => {
                if(data.length === 0){
                    this.notificationService.messageDefault(`Sem conexão com internet.`);
                }else {
                    this.restaurants = data;
                }
            })

            this.notificationService.loading();

            this.storage.get('token').then((data) => {
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
            this.navCtrl.setRoot('LoginPage')
        }


        logout(): void {
            //this.notificationProvider.confirmExit();
            let alert = this.alertCtrl
            .create({
                title: 'Logout',
                message: 'Tem certeza que quer sair?',
                buttons: [
                    {
                        text: 'Sair',
                        handler: () => {
                            this.authService.signOut();
                            this.navCtrl.setRoot(HomePage);
                        }
                    }
                ]
            });
            alert.present();
            alert.setMode("ios");
        }

    }
