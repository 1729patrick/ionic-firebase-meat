    import { API } from '../../app/app.api';
    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { NotificationProvider } from '../notification/notification';
    import { Observable } from 'rxjs/Observable';
    import { Storage } from '@ionic/storage';


    @Injectable()
    export class AuthProvider {

        users: any;


        constructor(
            public httpClient: HttpClient,
            public notificationProvider: NotificationProvider,
            public storage: Storage,
        ) {  }

        saveToken(user) {
            //HEADER
            let encodedHeader =  btoa(JSON.stringify({"alg": "HS256", "typ": "JWT"}));

            //PAYLOAD
            let payload = JSON.parse(`{"email":"${user.email}", "name":"${user.name}"}`);
            let encodedPayload = btoa(JSON.stringify(payload)); //codificar  base64

            //SIGNITURE
            let secret = btoa('eyJ1c2VySWQiOiIxNzI5IiwibmFtZSI6IlBhdHJpY2siLCJlbWFpbCI6InBhdHJpY2tAZmxleHByby5jb20uYnIifQ');


            let token = encodedHeader + "." + encodedPayload + "." + secret;

            this.storage.set('token', token);//TOKEN NO LOCAL STORAGE

            console.log(token)
        }



        createAccount(credentials){
            this.httpClient.post(`${API}/users`, credentials)
            .subscribe(data => {
                //console.log(data)
            })
        }


        userIsLogged() {//VERIFICA SE O USUÁRIO ESTÁ LOGADO
            return this.storage.get('token').then(data => {
            if (data){
                return data;
            }else {
                this.notificationProvider.messageDefault('Por favor, efetue o login para continuar.'); //mostra a mensagem para realizar o login
                return false;
            }
        });
    }

    logout() {
        this.storage.remove('token');
    }

    getUsers(): Observable<any>{
        return this.httpClient.get<any>(`${API}/users`);
    }

    }
