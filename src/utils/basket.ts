export default class Basket {
    private totalPrice: number = 0;

    public items: object = {
        'apple': {
            price: 0.50,
            quantity: 0,
            discount: this.defaultCalculator,
            initialStock: 3,
            stock: 3
        },
        'orange': {
            price: 0.75,
            quantity: 0,
            discount: this.bogofCalculator,
            initialStock: 10,
            stock: 10
        },
        'pear': {
            price: 1,
            quantity: 0,
            discount: this.threeForTwoCalculator,
            initialStock: 5,
            stock: 5
        }
    }

    private percentageOffCalculator(price: number, quantity: number, discountAmount: number): number {
        if(discountAmount !== 0) {
            let itemTotal: number = +(quantity * price * (1 - discountAmount / 100)).toFixed(2);
            return itemTotal;
        } else {
            return price * quantity;
        }
    }

    private threeForTwoCalculator(price: number, quantity: number): number {
        if(quantity > 0) {
            let timesToApply: number = Math.floor(quantity / 3);
            console.log(`${quantity} pears's should apply discount ${timesToApply} times`);
            return price * quantity - (timesToApply * price);
        } else {
            return quantity * price;
        }
    }

    private bogofCalculator(price: number, quantity: number): number {
        if(quantity > 0) {
            let timesToApply: number = Math.floor(quantity / 2);
            console.log(`${quantity} orange's should apply discount ${timesToApply} times`);
            return price * quantity - (timesToApply * price);
        } else {
            return quantity * price;
        }
    }

    private defaultCalculator(price: number, quantity: number): number {
        return price * quantity;
    }
    
    private discounts: object = {
        'apple': this.defaultCalculator,
        'orange': this.bogofCalculator,
        'pear': this.threeForTwoCalculator
    }

    private itemQuantities: object = {
        'apple': 0,
        'orange': 0,
        'pear': 0
    }

    private itemPrices: object = {
        'apple': 0.50,
        'orange': 0.75,
        'pear': 1
    }

    public setTotalPrice(cost: number): void {
        this.totalPrice += cost;
    } 

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public scan(item: string): void {
        if(Object(this.items)[item] !== undefined) {
            if(Object(this.items)[item].stock > 0) {
                Object(this.items)[item].quantity += 1;
                Object(this.items)[item].stock -= 1;
            }
        }
    }

    public remove(item: string): void {
        if(Object(this.items)[item] !== undefined) {
            if(Object(this.items)[item].quantity > 0) {
                Object(this.items)[item].quantity -= 1;
                Object(this.items)[item].stock += 1;
            }
        }
    }

    public addItem(name: string, price: number, stock: number, discount: string = "", percentageOff: number = 0): void {

        var functionToUse;
        if(discount === "3 for 2") {
            functionToUse = this.threeForTwoCalculator;
        } else if (discount === "bogof") {
            functionToUse = this.bogofCalculator;
        } else if (discount === "percent off") {
            functionToUse = this.percentageOffCalculator;
        } else {
            functionToUse = this.defaultCalculator;
        }
        
        var newItem: object = {

        }

        Object(newItem)[name] = {
            price: price,
            quantity: 0,
            discount: functionToUse,
            percentageOff: percentageOff,
            stock: stock,
            initialStock: stock
        }

        this.items = {...this.items, ...newItem};
        // console.log(this.items);
    }

    public total(): number {
        this.totalPrice = 0;

        for(let key in this.items) {
            const ITEM = Object(this.items)[key];
            this.totalPrice += ITEM.discount(ITEM.price, ITEM.quantity, ITEM.percentageOff);
        }
        return this.getTotalPrice();
    } 

    public getStock(item: string): number {
        return Object(this.items)[item].stock;
    }

    public getQuantity(item: string): number {
        return Object(this.items)[item].quantity;
    }

    public cancel(): void {
        for(let key in this.items) {
            const ITEM = Object(this.items)[key];
            ITEM.stock = ITEM.initialStock;
            ITEM.quantity = 0;
        }
    }

    public totalQuantity(): number {
        var quantity: number = 0;
        for(let key in this.items) {
            quantity += Object(this.items)[key].quantity;
        }
        return quantity;
    }
}