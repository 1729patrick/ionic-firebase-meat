import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';


@Injectable()
export class RestaurantService {

    constructor(public http: HttpClient) {  }

    db = firebase.firestore();

    getRestaurants(collection: string): Promise<any> {//lista de todos os restaurantes
        let restaurants : any = [];

        return new Promise((resolve, reject) => {
            this.db.collection(collection).get().then((querySnapshot) => {

                querySnapshot.forEach((doc: any) => {
                    restaurants.push({
                        id: doc.id,
                        name: doc.data().name,
                        category: doc.data().category,
                        deliveryEstimate: doc.data().deliveryEstimate,
                        rating: doc.data().rating,
                        imagePath: doc.data().imagePath,
                        about: doc.data().about,
                        hours: doc.data().hours,
                    });
                });

                resolve(restaurants);
            })
            .catch((error : any) => {
                reject(console.log(error));
            });
        });


    }
    getRestaurant(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.collection("restaurants").doc(`${id}`).get().then(function(doc) {
                resolve(doc.data());
            })
            .catch((error : any) => {
                reject(console.log(error));
            });
        })
    }



    getReviews(id: string):Promise<any> {
        let reviews:any = [];

        return new Promise((resolve, reject) => {
            this.db.collection("reviews").doc(`${id}`).collection(`${id}`).get().then((querySnapshot) => {

                querySnapshot.forEach((doc: any) => {
                    reviews.push({
                        id: doc.id,
                        name: doc.data().name,
                        rating: doc.data().rating,
                        date: doc.data().date,
                        comments: doc.data().comments,
                        restaurantId: doc.data().restaurantId
                    })
                })
                resolve(reviews)
            })
            .catch((error : any) => {
                reject(console.log(error));
            });
        })
    }



    getMenuItems(id: string): Promise<any> {
        let menuItems:any = [];
        return new Promise((resolve, reject) => {
            this.db.collection("menu").doc(`${id}`).collection(`${id}`).get().then((querySnapshot) => {

                querySnapshot.forEach((doc: any) => {
                    menuItems.push({
                        id: doc.id,
                        name: doc.data().name,
                        price: doc.data().price,
                        imagePath: doc.data().imagePath,
                        description: doc.data().description,
                        restaurantId: doc.data().restaurantId,
                    })
                })
                resolve(menuItems)
            })
            .catch((error : any) => {
                reject(console.log(error));
            });
        })
    }


    newReview(id: string, data) {
        let date = new Date().toLocaleString("pt-BR");

        this.db.collection("reviews").doc(`${id}`).collection(`${id}`).doc().set({
            name: data.name,
            rating: data.rating,
            comments: data.comments,
            date: date,
            restaurantId: data.restaurantId,
        })
    }

    newOrder(order, item, total) {
        let date = new Date().toJSON();

        this.db.collection("orders").doc(date).collection("orderAddress").doc(`${order.address}`).set({
            address: order.address,
            number: order.number,
            optionalAddress: order.optionalAddress,
            paymentOption: order.paymentOption,
            total: total,

        })

        for (let i in item) {
            this.db.collection("orders").doc(date).collection("orderItems").doc(`${item[i].id}`).set({

                name: item[i].name,
                price: item[i].price

            })
        }
    }

    createUser(credentials: any){
        this.db.collection("users").doc(credentials.email).set({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password
        })
    }
}
