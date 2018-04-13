import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { CartService } from '../services/cart/cart.service';
import { NotificationService } from '../services/notification.service';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { TokentService } from '../services/token';
import { AuthService } from '../services/auth.service';

import { CONFIG_FIREBASE } from '../config';
import firebase from 'firebase';   //firebase storage
import { TabsPage } from '../pages/tabs/tabs';
firebase.initializeApp(CONFIG_FIREBASE.fire);


@NgModule({
    declarations: [
        HomePage,
        MyApp,
        TabsPage

    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicStorageModule.forRoot({ name: '__mydb'}),
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            tabsPlacement: 'bottom',

        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        HomePage,
        MyApp,
        TabsPage
    ],
    providers: [
        NotificationService,
        CartService,
        RestaurantService,
        SplashScreen,
        StatusBar,
        TokentService,
        {provide:  ErrorHandler, useClass: IonicErrorHandler},
        AuthService,
    ]
})
export class AppModule {}
