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
            </div>

            <q-card class="busket-confirm">
                <q-card-section class="busket-confirm__content">
                    <h5 class="busket-confirm__title">Your Busket</h5>
                    <div class="busket-confirm__field">
                        <p class="busket-confirm__text">Products count:</p>
                        <p class="busket-confirm__value">{{ totalCount + ' pcs' }}</p>
                    </div>

                    <div class="busket-confirm__field">
                        <p class="busket-confirm__text_b">Busket cost:</p>
                        <p class="busket-confirm__value_b">{{ costString(totalSum) }}</p>
                    </div>


                </q-card-section>
                <q-card-section>
                    <q-btn color="primary" :disable="busket.length === 0" label="Confirm" class="busket-confirm__btn" @click="onMainClick"/>

                </q-card-section>

            </q-card>
        </div>


    </div>
</template>

<script lang="ts">
import { useBusket } from 'src/stores/busket'
import { ProductInterface } from 'src/types/product'
import { defineComponent } from 'vue'
import BusketItem from 'components/busket/Item.vue'

export default defineComponent({
    components: {
        BusketItem
    },
    data() {
        return {
            busket: [] as ProductInterface[]
        }
    },
    beforeMount() {
        useBusket().setFromLocal()
        const busketData = useBusket().getBusket
        this.busket = busketData

        console.log(this.busket);

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
        costString (cost: number) {
			return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸'
		},
    },
    setup() {

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

.busket-confirm {
    min-width: 240px;
    max-height: 230px;

    display: flex;
    flex-direction: column;

    justify-content: space-between;

    &__title {
        margin-bottom: 15px;
    }

    &__field {
        margin-bottom: 7px;

        display: flex;
        justify-content: space-between;
    }

    &__text, &__value {
        font-size: 14px;

        &_b {
            font-weight: bolder;
        }
    }

    &__btn {
        width: 100%;
    }
}

</style>
