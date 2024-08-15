<template>
    <q-card class="busket-item">
        <q-btn round color="red" icon="delete" class="busket-item__remove" size="sm" @click="removeFromBusket"/>
        <q-card-section class="busket-item__content">
            <div class="busket-item__img" :style="{ backgroundImage: 'url(' + product.image + ')' }">

            </div>
            <div class="busket-item__info">
                <div class="busket-item__text">
                    <h5 class="busket-item__title">{{ product.name }}</h5>
                    <p class="busket-item__description">{{ product.description }} </p>
                    <p>Cost: {{ costString(item.cost) }}</p>
                </div>

                <div class="busket-item__btns">
                    <q-btn-group rounded >
                        <q-btn color="primary" rounded :disable="!isNotSmallCount"  icon="remove" @click="minusCount"></q-btn>
                        <q-btn color="primary" rounded disable :label="count" class="product__count_num"></q-btn>
                        <q-btn color="primary" rounded :disable="!isNotBigCount"  icon="add" @click="plusCount"></q-btn>
                    </q-btn-group>
                    <p class="text-subtitle1">Total Cost: {{  costString(item.cost * count) }}</p>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { useBusket } from 'src/stores/busket'
import { ProductClass, ProductInterface } from 'src/types/product'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BusketItem',
    data() {
        return {
            count: this.item.count ? this.item.count : 1,
            product: this.item.product
        }
    },
    props: {
        item: {
            type: Object as () => ProductClass,
            required: true
        },
    },
    methods: {
        plusCount() {
            if (this.isNotBigCount) {
                this.count++
                this.changeItemInBusket()
            }
        },
        minusCount() {
            if (this.isNotSmallCount) {
                this.count--
                this.changeItemInBusket()

            }
        },
        costString (cost: number) {
			return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸'
		},
        changeItemInBusket() {
            const newItem: ProductInterface = this.item;
            newItem.count = this.count;

            useBusket().changeCount(newItem);
        },
        removeFromBusket() {
            useBusket().delItemBusket(this.item.id)
        }
    },
    computed: {
        isNotSmallCount() {
            if (this.count > 1) {
                return true
            }
            return false
        },
        isNotBigCount() {
            if (this.count < 20) {
                return true
            }
            return false
        },
    },
})
</script>

<style lang="scss">
.busket-item {
    width: 100%;
    position: relative;

    &__remove {
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 100;
    }

    &__content {
        display: flex;
        gap: 20px;
    }

    &__img {
        width: 150px;
        min-width: 150px;
        height: 150px;

        background: rgb(244, 244, 244);

        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

    }

    &__info {
        display: flex;
        flex-direction: column;

        justify-content: space-between;
    }

    &__title {
        font-size: 20px;
    }

    &__description {
        font-size: 14px;
    }

    &__text {
        font-size: 16px;
    }

    &__btns {
        display: flex;
        gap: 15px;
        align-items: flex-end;
    }
}
</style>
