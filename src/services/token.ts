import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class TokentService {

    constructor(public storage: Storage) {  }

    saveToken(user) {
        //HEADER
        let encodedHeader =  btoa(JSON.stringify({"alg": "HS256", "typ": "JWT"}));

        //PAYLOAD
        let payload = JSON.parse(`{"email":"${user.email}"}`);
        let encodedPayload = btoa(JSON.stringify(payload)); //codificar  base64

        //SIGNITURE
        let secret = btoa('eyJ1c2VySWQiOiIxNzI5IiwibmFtZSI6IlBhdHJpY2siLCJlbWFpbCI6InBhdHJpY2tAZmxleHByby5jb20uYnIifQ');


        let token = encodedHeader + "." + encodedPayload + "." + secret;

        this.storage.set('token', token);//TOKEN NO LOCAL STORAGE

        console.log('Token: ' + token);

    }
}
