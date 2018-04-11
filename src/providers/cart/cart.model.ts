export interface MenuItem {

    id: string;
    name: string;
    description: string;
    price: number;
    imagePath: string;
    quantity?: number;

    /*
    "id": "cup-cake",
    "imagePath": "assets/imgs/foods/cupcake.png",
    "name": "Cup Cake",
    "description": "Cup Cake recheado de Doce de Leite",
    "price": 8.7,
    "id": "bread-bakery"
    */
}
