import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from './cart.model';
import { RestaurantService } from '../restaurant/restaurants.service';

@Injectable()
export class CartService {
    total: number = 0;
    item: MenuItem[] = [];
    order: any = [];
    constructor(
        public httpClient: HttpClient,
        public restaurantService: RestaurantService) {  }

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
            this.total += item.price;
            this.getTotal();
        }

        getTotal(): number {
            return this.total;
        }

        createOrder(order){
            this.order.push(order);
            this.order.push(this.item);
            this.restaurantService.newOrder(this.order);
        }
    }
