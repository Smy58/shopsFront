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

                        <q-card-section>
                            {{  dialogMes }}
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
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import BusketItem from 'components/busket/Item.vue'
import BusketConfirm from 'components/busket/Confirm.vue'
import { addOrder } from 'boot/orders'
import { useUsers } from 'src/stores/user'

export default defineComponent({
    components: {
        BusketItem,
        BusketConfirm
    },
    setup() {
        const busket = ref([] as ProductInterface[]);
        const isLoading = ref(false);
        const dialog = ref(false);
        const dialogMes = ref('');

        const totalSum = computed(() => {
            let sum = 0;
            busket.value.forEach((item) => {
                if (item.count) {
                    sum += (item.cost * item.count)
                }
            })

            return sum
        });
        const totalCount = computed(() => {
            let sum = 0;
            busket.value.forEach((item) => {
                if (item.count) {
                    sum += item.count
                }
            })

            return sum
        })


        async function handleBtn () {
            const user = useUsers().getCurUser
            const userId = user ? user.id : 0

            isLoading.value = true
            await addOrder(busket.value, totalSum.value, userId)
                .then((res) => {
                    useBusket().clearBusket()
                    busket.value = []
                    isLoading.value = false
                    dialog.value = true
                    dialogMes.value = 'Sent. Your order on processing.'
                })
                .catch((err) => {
                    isLoading.value = false
                    dialog.value = true
                    dialogMes.value = 'Error, try again later'
                })
        }

        onBeforeMount(() => {
            useBusket().setFromLocal()
            const busketData = useBusket().getBusket
            busket.value = busketData
        })

        return {
            busket,
            isLoading,
            dialog,
            totalSum,
            totalCount,
            dialogMes,
            handleBtn
        }
    }
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
