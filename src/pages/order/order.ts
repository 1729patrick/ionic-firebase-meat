import { CartService } from '../../providers/cart/cart.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { OrderSummaryPage } from '../order-summary/order-summary';

@IonicPage()
@Component({
    selector: 'page-order',
    templateUrl: 'order.html',
})
export class OrderPage {
    total: number;
    formOrder: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public cartService: CartService,
        public navCtrl: NavController,
        public notificationProvider: NotificationProvider,
        public navParams: NavParams) {

            this.total = this.cartService.getTotal();

            this.formOrder = this.formBuilder.group({
                address:  this.formBuilder.control('', [Validators.required, Validators.minLength(7)]),
                number:  this.formBuilder.control('', [Validators.required]),
                paymentOption: this.formBuilder.control('',[Validators.required]),
                optionalAddress: '',
            })

        }

        createOrder(): void{
            if (this.formOrder.valid){
                this.cartService.createOrder(this.formOrder.value);
                this.cartService.clear();
                this.navCtrl.setRoot(OrderSummaryPage)
            } else{
                this.notificationProvider.messageDefault(`Preencha todos os campos.`);
            }

        }


    }
