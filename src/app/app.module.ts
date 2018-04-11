import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AuthProvider } from '../providers/auth/auth';
import { CartPage } from '../pages/cart/cart'
import { CartService } from '../providers/cart/cart.service';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { MyApp } from './app.component';
import { OrderPage } from '../pages/order/order';
import { OrderSummaryPage } from '../pages/order-summary/order-summary';
import { NotificationProvider } from '../providers/notification/notification';
import { RestaurantDetailPage } from '../pages/restaurant-detail/restaurant-detail';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { RestaurantService } from '../providers/restaurant/restaurants.service';
import { ReviewsPage } from '../pages/reviews/reviews';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';


@NgModule({
    declarations: [
        CartPage,
        HomePage,
        LoginPage,
        MenuPage,
        MyApp,
        OrderPage,
        OrderSummaryPage,
        RestaurantDetailPage,
        RestaurantsPage,
        ReviewsPage,
        SignupPage,
        TabsPage,
        WelcomePage,
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
        CartPage,
        HomePage,
        LoginPage,
        MenuPage,
        MyApp,
        OrderPage,
        OrderSummaryPage,
        RestaurantDetailPage,
        RestaurantsPage,
        ReviewsPage,
        SignupPage,
        TabsPage,
        WelcomePage,
    ],
    providers: [
        NotificationProvider,
        AuthProvider,
        CartService,
        RestaurantService,
        SplashScreen,
        StatusBar,
        {provide:  ErrorHandler, useClass: IonicErrorHandler},

    ]
})
export class AppModule {}
