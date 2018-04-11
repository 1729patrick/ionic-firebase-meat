import { API } from '../../app/app.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../cart/cart.model';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from './restaurant.model';

@Injectable()
export class RestaurantService {

    constructor(
        public httpClient: HttpClient){  }

        showRestaurants(): Observable<Restaurant[]> {
            return this.httpClient.get<Restaurant[]>(`${API}/restaurants`); //para pegar todos os dados json de http://localhost:3000/restaurants
        }

        restaurantById(id: string): Observable<Restaurant> {
            return this.httpClient.get<Restaurant>(`${API}/restaurants/${id}`);
        }

        restaurantReviews(id: string): Observable<any> { //para ir ao caminho reviws aopos clicar em algum restaurante
            return this.httpClient.get(`${API}/restaurants/${id}/reviews`);
        }

        newReview(id, review) { //salvar nova avaliação no db
            this.httpClient.post(`${API}/restaurants/${id}/reviews`, review)
            .subscribe(data => {
                //console.log(data)
            })
        }

        restaurantMenu(id: string): Observable<MenuItem[]>{//menu de itens do restaurante
            return this.httpClient.get<MenuItem[]>(`${API}/restaurants/${id}/menu`);
        }

        newOrder(order: MenuItem) {
            this.httpClient.post<MenuItem>(`${API}/orders`, order)
            .subscribe(data =>{
                console.log(data);
            })
        }

    }
