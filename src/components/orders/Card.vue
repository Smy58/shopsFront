<template>
    <q-card class="order-card">
        <q-card-section class="order-card__content">
            <div class="order-card__img"></div>
            <div class="order-card__info">
                <h5 class="order-card__title">{{ 'Order ID: ' +  item.id + '. ' + shop.name }}</h5>

                <q-list  bordered padding class="rounded-borders order-card__product-list">
                    <q-item v-for="el in products"
                        :key="el.id"
                        clickable v-ripple class="product-item"
                    >
                        <q-item-section>
                            <p class="product-item__name">{{ el.product.name }}</p>
                            <p class="product-item__text">Count: {{ el.count }}</p>
                            <p class="product-item__text">Cost: {{ el.cost }}</p>
                            <p class="product-item__cost">Total Cost: {{ el.count * el.cost }}</p>
                        </q-item-section>
                    </q-item>
                </q-list>

                <p class="text-h5 order-card__cost">Order Total Cost: {{item.totalCost}}</p>
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { OrderClass, OrderInterface } from 'src/types/order'

const productsMock = [
{
        "id": 1,
        "shopId": 2,
        "cost": 384,
        "count": 1,
        "product": {
            "id": 5,
            "name": "dog food",
            "description": "-",
            "vendorCost": 247,
            "image": "img link",
            "group": {
                "id": 4,
                "name": "Pet food"
            }
        }
    },
    {
        "id": 2,
        "shopId": 2,
        "cost": 421,
        "count": 1,
        "product": {
            "id": 6,
            "name": "pet care",
            "description": "-",
            "vendorCost": 251,
            "image": "img link",
            "group": {
                "id": 4,
                "name": "Pet food"
            }
        }
    },
    {
        "id": 3,
        "shopId": 2,
        "cost": 516,
        "count": 1,
        "product": {
            "id": 7,
            "name": "cat food",
            "description": "-",
            "vendorCost": 219,
            "image": "img link",
            "group": {
                "id": 4,
                "name": "Pet food"
            }
        }
    },
]


export default defineComponent({
    name: "OrderCard",
    props: {
        item: {
            type: Object as () => OrderClass,
            required: true
        }
    },
    data(){
        return {
            shop: this.item.shop,
            status: this.item.status,
            delivery: this.item.delivery,
            client: this.item.client,
            products: productsMock
        }
    },
})
</script>


<style lang="scss">
.order-card {
    width: 100%;

    &__content {
        display: flex;
        gap: 20px;
    }

    &__img {
        width: 170px;
        min-width: 170px;
        height: 170px;

        background: rgb(244, 244, 244);

    }

    &__info {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    &__title {
        margin-bottom: 20px;
    }

    &__product-list {
        width: 100%;
        margin-bottom: 15px;
    }

    &__cost {
        font-weight: bolder;
    }
}

.product-item {

    &__name {
        font-weight: bolder;
    }
}
</style>
