import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { NotificationService } from './notification.service';
@Injectable()
export class AuthService {

	constructor(
		private storage: Storage,
		public notificationService: NotificationService) { }

		signInWithEmail(credentials) {
			return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
		}

		signUp(credentials) {

			return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
		}

		signOut(): Promise<void> {
			this.storage.remove('token');
			return firebase.auth().signOut();
		}

		userIsLogged() {
			return this.storage.get('token').then(data => {
				if (data){
					return data;
				}else {
					this.notificationService.messageDefault('Por favor, efetue o login para continuar.'); //mostra a mensagem para realizar o login
					return false;
				}
			});
		}
	}
