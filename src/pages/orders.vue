<template>
    <div class="orders-page">
        <h4 class="text-h4 orders-page__title">Orders</h4>

        <div class="orders-page__content">
            <div class="orders">
                <OrderCard v-for="item in ordersData" :key="item.id" :item="item" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OrderCard from 'components/orders/Card.vue'

const ordersMock = [
    {
        "id": 1,
        "totalCost": 2000,
        "shop": {
            "id": 2,
            "name": "Second Shop",
            "address": "Tole bi 112",
            "workTimeStart": "12:00",
            "workTimeEnd": "18:00",
            "waitingTime": 30,
            "image": "image url"
        },
        "status": {
            "id": 3,
            "name": "Delivering"
        },
        "delivery": {
            "id": 1,
            "worker": {
                "id": 1,
                "name": "Amir",
                "shopId": 2,
                "role": {
                    "id": 1,
                    "name": "admin"
                }
            }
        },
        "client": {
            "id": 1,
            "name": "Kostya",
            "address": "Dostyk 111",
            "phone": "+7 777 666 55 44",
            "mail": null
        }
    },
    {
        "id": 2,
        "totalCost": 2800,
        "shop": {
            "id": 4,
            "name": "first Shop",
            "address": "Tole bi 112",
            "workTimeStart": "09:00",
            "workTimeEnd": "18:00",
            "waitingTime": 30,
            "image": "image url"
        },
        "status": {
            "id": 1,
            "name": "Done"
        },
        "delivery": {
            "id": 3,
            "worker": {
                "id": 6,
                "name": "Bekarys",
                "shopId": 4,
                "role": {
                    "id": 3,
                    "name": "deliver"
                }
            }
        },
        "client": {
            "id": 2,
            "name": "Alina",
            "address": "Dostyk 121",
            "phone": "+7 777 111 22 33",
            "mail": null
        }
    }
]

export default defineComponent({
    components: {
        OrderCard
    },
    data() {
        return {
            ordersData: ordersMock
        }
    },
})
</script>

<style lang="scss">
.orders-page {
    display: flex;
    flex-direction: column;
    width: 95%;

    padding: 20px;

    &__title {
        margin-bottom: 20px;
    }

    &__content {
        display: flex;
        gap: 20px;
    }
}

.orders {
    display: flex;
    flex-direction: column;
    gap: 15px;

    width: 100%;
}


</style>
