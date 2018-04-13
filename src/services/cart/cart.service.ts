import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from './cart.model';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class CartService {
    total: number = 0;
    item: MenuItem[] = [];

    constructor(
        public httpClient: HttpClient,
        public restaurantProvider: RestaurantService) {  }

        clear(): void {
            this.item = [];
            this.total = 0;
            this.getTotal();
        }

        deleteItem(i):void {
            this.total -= this.item[i].price;
            this.item.splice(i, 1);
            this.getTotal();
        }

        addItem(item): void {
            this.item.push(item);
            this.total += parseFloat(item.price);
            this.getTotal();
        }

        getTotal(): number {
            return this.total;
        }

        createOrder(order){
            this.restaurantProvider.newOrder(order, this.item, this.total);
        }
    }
