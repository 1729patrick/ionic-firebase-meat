import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TokentService } from '../../services/token';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    loginForm: FormGroup;

    constructor(
        private auth: AuthService,
        public formBuilder: FormBuilder,
        public navCtrl: NavController,
        public navParams: NavParams,
        public NotificationService: NotificationService,
        public toastCtrl: ToastController,
    	private token: TokentService) {

            this.loginForm = this.formBuilder.group({    //VALIDACAO DOS CAMPOS DE LOGIN
                email: this.formBuilder.control('', [Validators.required, Validators.email]),
                password: this.formBuilder.control('', [Validators.required]),
            })

        }

        signup(){
            this.navCtrl.push('SignupPage');
        }

        pushHome(): void {
            this.navCtrl.setRoot(HomePage);
        }

        pushSignUp(): void {
            this.navCtrl.push('SignupPage');
        }


        login() {
            let data = this.loginForm.value;

            if (this.loginForm.valid){

                if (!data.email) {
                    return;
                }

                let credentials = {
                    email: data.email,
                    password: data.password
                };
                this.auth.signInWithEmail(credentials)
                .then(
                    () => {
                        this.navCtrl.setRoot('RestaurantsPage');
                        this.token.saveToken(credentials)
                    },
                    error => {
                        this.NotificationService.messageDefault(`Credenciais incorretas.`);
                    }
                );
            }else {
                this.NotificationService.messageDefault(`Dados inválidos.`);//mensagem de dados inválido
            }

        }


    }
