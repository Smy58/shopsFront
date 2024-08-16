<template>
    <q-card class="order-card">
        <q-card-section class="order-card__content">
            <p :class="`order-card__status ${statusStyle}`">{{ item.status.name }}</p>
            <div class="order-card__img" :style="{ backgroundImage: 'url(' + shop.image + ')' }"></div>
            <div class="order-card__info">
                <div class="order-card__describe">
                    <h5 class="order-card__title">{{ 'Order ID: ' +  item.id + '. ' + shop.name }}</h5>

                    <q-expansion-item style="max-width: 350px; "
                        v-model="visible"
                        @click="onclick"
                        label="Show more information"
                        >
                        <q-list  bordered padding class="rounded-borders order-card__product-list">
                            <q-skeleton v-if="loading" type="rect" />
                            <q-item v-for="el in products"
                                :key="el.id"
                                clickable v-ripple class="product-item"
                            >
                                <q-item-section>
                                    <p class="product-item__name">{{ el.position.product.name }}</p>
                                    <p class="product-item__text">Count: {{ el.count }}</p>
                                    <p class="product-item__text">Cost: {{ el.position.cost }}</p>
                                    <p class="product-item__cost">Total Cost: {{ el.count * el.position.cost }}</p>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-expansion-item>
                </div>

                <p class="text-h5 order-card__cost">Order Total Cost: {{item.totalCost}}</p>
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { OrderClass, OrderInterface, OrderPositionInterface } from 'src/types/order'
import { getOrderPositions } from 'boot/orders'


export default defineComponent({
    name: "OrderCard",
    props: {
        item: {
            type: Object as () => OrderClass,
            required: true,
        }
    },
    setup(props) {
        const { item } = props

        const shop = ref(item.shop);
        const status = ref(item.status);
        const delivery = ref(item.delivery);
        const client = ref(item.client);
        const products = ref([] as OrderPositionInterface[]);
        const visible = ref(false);
        const loading = ref(false);

        const statusStyle = computed(() => {
            if (item.status.id == 1) {
                return 'order-card__status_green'
            }
            if (item.status.id == 3) {
                return 'order-card__status_yellow'
            }

            return ''
        })

        async function onclick() {
            if (products.value.length == 0) {
                loading.value = true

                getOrderPositions(item.id)
                    .then((res) => {
                        products.value = res
                        loading.value = false
                    })
            }
        }

        return {
            shop,
            status,
            delivery,
            client,
            products,
            visible,
            loading,
            statusStyle,
            onclick
        }
    }
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

        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

    }

    &__status {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 16px;

        &_green {
            font-weight: bolder;
            color: #26A69A;
        }

        &_yellow {
            color: #F2C037
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        width: 100%;

        justify-content: space-between;
    }

    &__describe {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    &__title {
        margin-bottom: 5px;
    }

    &__product-list {
        width: 100%;
        margin-bottom: 15px;
        padding: 10px;
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
