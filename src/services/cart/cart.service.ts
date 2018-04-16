import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class CartService {
    total: number = 0.0;
    item: any[] = [];

    constructor(
        public httpClient: HttpClient,
        public restaurantProvider: RestaurantService) {  }

        clear(): void {
            this.item = [];
            this.total = 0;
        }

        deleteItem(id):any {
            this.total -= parseFloat(this.item[id].price);
            this.item.splice(id, 1);

            if (this.total < 0){
                this.total = 0;
            }
        }

        addItem(item): void {
            this.item.push(item);
            this.total += parseFloat(item.price);
        }

        createOrder(order){
            this.restaurantProvider.newOrder(order, this.item, this.total);
        }
    }
