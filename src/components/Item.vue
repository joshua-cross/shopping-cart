<template>
    <div class="item">
        <h1>
            {{ name }}
            <div>
                <img :src="calculateImage()" />
            </div>
            <div class = "stock">
                <button @click="decrease">
                    -
                </button>
                <span>{{ item.quantity }}</span>
                <button @click="increase">
                    +
                </button>
            </div>
        </h1>
    </div>
</template>

<script>
import apple from '../assets/apple.jpeg';
import Basket from '../utils/basket';
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            required: true
        },
    },
    data: () => {
        
    },
    methods: {
        calculateImage() {
            return apple;
        },
        increase() {
            this.$emit('increase', this.name);
        },
        decrease() {
            this.$emit('decrease', this.name);
        }
    }
}
</script>

<style lang="scss" scoped>
    $button-color: rgb(121, 121, 226);

    .item {
        h1 {
            font-family: Arial;
            letter-spacing: 0.5px;
            text-transform: capitalize;
        }
        width: 30%;
        text-align: center;
        // display: inline-block;
        box-shadow: 1px 1px 10px rgba(61, 61, 61, 0.5);
        border-radius: 7px;
        border: 1px solid rgb(168, 168, 168);
        padding: 20px;

        img {
            max-height: 250px;
            margin: 10px 0px;

        }

        .stock {
            span {
                font-size: 18px;
                margin: 0px 20px;
            }
            button {
                font-family: Arial;
                padding: 10px;
                border: transparent;
                border-radius: 5px;
                background-color: $button-color;
                font-weight: bold;
                font-size: 24px;
                width: 50px;
                transition: background-color 0.5 ease-out;

                &:hover {
                    background-color: darken($button-color, 5%)
                }

                &:focus {
                    background-color: rgb(207, 185, 87);
                }
            }
        }
    }
</style>