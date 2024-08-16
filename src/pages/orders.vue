<template>
    <div class="orders-page">
        <h4 class="text-h4 orders-page__title">Orders</h4>

        <div class="orders-page__content">
            <div class="orders">
                <OrderCard v-for="item in ordersData" :key="item.id" :item="item"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import OrderCard from 'components/orders/Card.vue'
import { getOrders } from 'boot/orders'
import { useOrders } from 'src/stores/orders'
import { OrderInterface } from 'src/types/order'
import { useUsers } from 'src/stores/user'

export default defineComponent({
    components: {
        OrderCard
    },
    setup() {
        const ordersData = ref([] as OrderInterface[]);

        onBeforeMount(async () => {
            const user = useUsers().getCurUser

            if (user) {
                await getOrders(user.id)
                .then((res) => {
                    useOrders().setOrders(res)
                })

                ordersData.value = useOrders().getOrders
            }
        })

        return {
            ordersData
        }
    }
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
    gap: 25px;

    width: 100%;
}


</style>
