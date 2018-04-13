import { AlertController, ToastController  } from 'ionic-angular';
import { CartService } from './cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantService } from './restaurant/restaurant.service';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class NotificationService {

    constructor(
        public alertCtrl: AlertController,
        public cartService: CartService,
        public http: HttpClient,
        public restaurantProvider: RestaurantService,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController) { }



        messageDefault(message) {//MENSAGEM PARA LOGAR AO TENTAR ACESSAR O MENU
            let toast = this.toastCtrl
            .create({
                message: message,
                duration: 3000,
            });
            toast.present();
        }


        loading(){
            let loading = this.loadingCtrl.create({
                spinner: 'crescent',
                duration: 500
            });
            loading.present()
        }




        confirmAdd(item) {//CONFIRMAÇÃO PARA ADICIONAR ITEM NO CARRINHO
            let alert = this.alertCtrl
            .create({
                title: `${item.name}`,
                subTitle: `${item.description}`,
                message: `R$${item.price}0`,
                buttons: [{
                    text: 'Confirmar',
                    handler: () => {
                        this.cartService.addItem(item);

                        let toast = this.toastCtrl.create({
                            message: `${item.name} adicionado no carrinho.`,
                            duration: 3000,
                        });
                        toast.present();
                    }
                }]
            });
            alert.setMode("ios");
            alert.present();
        }

        showReview(review) {//VER MAIS EM AVALIAÇÕES
            let alert = this.alertCtrl
            .create({
                title: `Avaliação de ${review.name}!`,
                subTitle: `${review.comments}`,
                buttons: ['OK']
            });
            alert.setMode("ios");
            alert.present();
        }


        newReview(id){//NOVA AVALIAÇÃO
            let alert = this.alertCtrl
            .create({
                title: 'Nova avaliação',
                inputs: [
                    {
                        name: 'rating',
                        placeholder: 'Nota',
                        type: 'number'
                    },
                    {
                        name: 'name',
                        placeholder: 'Nome',
                        type: 'string'
                    },
                    {
                        name: 'comments',
                        placeholder: 'Comentário',
                        type: 'string'
                    },
                    {
                        name: 'restaurantId',
                        value: `${id}`,
                        type: 'hidden'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: data => {

                            this.messageDefault('Comentário cancelado.');
                        }
                    },
                    {
                        text: 'Salvar',
                        handler: data => {
                            if (alert.data.inputs[0].value != '' && alert.data.inputs[1].value != '' && alert.data.inputs[2].value != ''){
                                if (alert.data.inputs[0].value >= 0 && alert.data.inputs[0].value <= 5){
                                    this.restaurantProvider.newReview(id, data); //salvar o comentário no db

                                    this.messageDefault('Comentário adicionado.');

                                }else{
                                    this.messageDefault('Avalie entre 0 e 5.');
                                }
                            }else {
                                this.messageDefault('Comentário inválido.');

                            }
                        }
                    }
                ]
            })
            alert.present();
            alert.setMode("ios");
        }
    }
