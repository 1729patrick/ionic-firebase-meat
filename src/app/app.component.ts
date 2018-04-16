import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any;

    constructor(
        platform: Platform,
        splashScreen: SplashScreen,
        statusBar: StatusBar,
        storage: Storage) {

            storage.get('token').then((data) => { //se o usuário estiver logado, lista de restaurante será a homepage
                if(data){
                this.rootPage = 'RestaurantsPage';
            }else{
                this.rootPage = HomePage;
            }
            //console.log('Token: ' + data)
        });


        //COR DA NAVBAR DO ANDROID
        platform.ready().then(() => {
        statusBar.backgroundColorByHexString("#f53d3d");
    });

}

}
