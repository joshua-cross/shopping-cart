<template>
    <div>
        <div class = "cart">
            Shopping Cart: {{ basketQuantity }} Items, £{{ basketPrice }}
        </div>
        <div class = "items">
            <app-item 
            v-for="(item, key, i) in items" 
            :name="key" 
            :item="item" 
            :key="i"
            @increase="increase"
            @decrease="decrease"
            >
        
            </app-item>
        </div>
    </div>
</template>

<script>
import Basket from '../utils/basket';
import Item from './Item';
var basket = new Basket();
export default {
    data: () => {
        return {
            // basket: new Basket(),
            items: basket.items,
            basketQuantity: basket.totalQuantity(),
            basketPrice: basket.total()
        }
    },
    created() {
        console.log(basket.items);
    },
    components: {
        appItem: Item
    },
    methods: {
        setData() {
            this.basketQuantity = basket.totalQuantity();
            this.basketPrice = basket.total();
        },
        increase(name) {
            console.log(name)
            basket.scan(name)
            this.items = basket.items;
            this.setData();
            console.log(basket.getStock(name));
        },
        decrease(name) {
            console.log(name)
            basket.remove(name)
            this.items = basket.items;
            console.log(basket.getStock(name));
            this.setData();
        }
    }
}
</script>

<style lang="scss" scoped>
.items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.cart {
    margin-left: 20px;
    padding: 20px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 1px;
}
</style>