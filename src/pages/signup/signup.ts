import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { HomePage } from '../home/home';
import { TokentService } from '../../services/token';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {
    signUpForm: FormGroup;
    users: any;
    signupError: string;

    constructor(
        public navCtrl: NavController,
        public notificationService: NotificationService,
        public formBuilder: FormBuilder,
        private auth: AuthService,
        public restaurantService: RestaurantService,
        public tokentService: TokentService) {

            //VALIDACAO DOS CAMPOS DE NOVA CONTA
            this.signUpForm = this.formBuilder.group({
            name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
            email: this.formBuilder.control('', [Validators.required, Validators.email]),
            password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: this.formBuilder.control('', [Validators.required, Validators.minLength(6)])
        })
    }

    pushHome(): void {
        this.navCtrl.setRoot(HomePage);
    }

    signUp() {

        if(this.signUpForm.valid) {
            let data = this.signUpForm.value;

            if(data.password == data.confirmPassword){

                this.restaurantService.createUser(data);
                let credentials = {
                    email: data.email,
                    password: data.password
                };


                this.auth.signUp(credentials).then(
                    () =>{
                        this.notificationService.messageDefault(`Olá ${data.name}, bem-vindo.`);
                        this.navCtrl.setRoot('RestaurantsPage');
                        this.tokentService.saveToken(credentials)

                    },
                    error =>  {
                        this.notificationService.messageDefault(`Email já cadastrado.`);
                    }
                );
            }else{
                this.notificationService.messageDefault(`Senhas não coincidem.`);//mensagem de senhas diferentes
            }
        }else {
            this.notificationService.messageDefault(`Dados inválidos.`);//mensagem de dados inválidos
        }
    }

}
