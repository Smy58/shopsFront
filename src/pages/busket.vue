<template>
    <div class="busket-page">
        <h4 class="text-h4 busket-page__title">Busket</h4>

        <div class="busket-page__content">
            <div class="busket">
                <BusketItem v-for="item in busket" :key="item.id" :item="item" />

                <div v-if="busket.length === 0" class="busket__empty">
                    <p class="text-h5">Busket empty</p>
                    <q-icon name="production_quantity_limits" color="grey" size="xl"></q-icon>
                </div>

                <q-dialog v-model="dialog" backdrop-filter="blur(4px)">
                    <q-card style="width: 320px">
                        <q-card-section class="row items-center q-pb-none text-h6">
                            Sent
                        </q-card-section>

                        <q-card-section>
                            Your order on processing.
                        </q-card-section>

                        <q-card-actions align="right">
                            <q-btn flat label="Close" color="primary" v-close-popup />
                        </q-card-actions>
                    </q-card>
                </q-dialog>
            </div>

            <BusketConfirm
                :totalSum="totalSum"
                :totalCount="totalCount"
                :handleBtn="handleBtn"
                :isDis="busket.length === 0 || isLoading"
            />
        </div>


    </div>
</template>

<script lang="ts">
import { useBusket } from 'src/stores/busket'
import { ProductInterface } from 'src/types/product'
import { defineComponent } from 'vue'
import BusketItem from 'components/busket/Item.vue'
import BusketConfirm from 'components/busket/Confirm.vue'
import { addOrder } from 'src/api/orders'
import { useUsers } from 'src/stores/user'

export default defineComponent({
    components: {
        BusketItem,
        BusketConfirm
    },
    data() {
        return {
            busket: [] as ProductInterface[],
            isLoading: false,
            dialog: false
        }
    },
    beforeMount() {
        useBusket().setFromLocal()
        const busketData = useBusket().getBusket
        this.busket = busketData


    },
    computed: {
        totalSum() {
            let sum = 0;
            this.busket.forEach((item) => {
                if (item.count) {
                    sum += (item.cost * item.count)
                }
            })

            return sum
        },
        totalCount() {
            let sum = 0;
            this.busket.forEach((item) => {
                if (item.count) {
                    sum += item.count
                }
            })

            return sum
        }
    },
    methods: {
        async handleBtn () {

            const user = useUsers().getCurUser
            const userId = user ? user.id : 0

            this.isLoading = true
            await addOrder(this.busket, this.totalSum, userId)
                .then((res) => {
                    useBusket().clearBusket()
                    this.busket = []
                    this.isLoading = false
                    this.dialog = true

                })
        }
    },
})
</script>

<style lang="scss">
.busket-page {
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

.busket {
    display: flex;
    flex-direction: column;
    min-width: 540px;
    width: 100%;

    gap: 15px;

    &__empty {
        color: #9e9e9e;

        display: flex;
        align-items: center;
        justify-content: center;

        flex-direction: column;

        height: 240px;
    }
}



</style>
