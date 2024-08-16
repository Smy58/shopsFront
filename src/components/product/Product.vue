<template>
    <div class="product">
        <h4 class="product__title">{{ product?.name }}</h4>
        <div class="product__content">
            <div class="product__image" :style="{ backgroundImage: 'url(' + product.image + ')' }"></div>
            <div class="product__info">
                <p class="text-subtitle1">{{ product?.description }}</p>
                <div class="product__adding-block">
                    <p class="text-subtitle1 product__cost">Cost: {{ costString(data.cost) }}</p>
                    <p class="text-subtitle1 product__cost">Total Cost: {{  costString(data.cost * count) }}</p>
                    <p v-if="isInBusket">IN BUSKET</p>
                    <div class="product__count">
                        <q-btn-group rounded>
                            <q-btn color="primary" rounded :disable="!isNotSmallCount"  icon="remove" @click="minusCount"></q-btn>
                            <q-btn color="primary" rounded disable :label="count" class="product__count_num"></q-btn>
                            <q-btn color="primary" rounded :disable="!isNotBigCount"  icon="add" @click="plusCount"></q-btn>
                        </q-btn-group>
                    </div>
                    <div class="product__btns">
                        <q-btn color="primary" :label="isInBusket ? 'Change' : 'Add to busket'" class="product__btn" @click="onMainClick"/>
                        <q-btn v-if="isInBusket" color="red" label="Remove" class="product__btn_remove" @click="removeFromBusket"/>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useBusket } from 'src/stores/busket'
import { ProductClass, ProductInterface } from 'src/types/product'
import { computed, defineComponent, ref } from 'vue'


export default defineComponent({
    name: "Product",
    props: {
        data: {
            type: Object as () => ProductClass,
            required: true
        },
        inBusket: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        const { data, inBusket } = props

        const count = ref(data.count ? data.count : 1);
        const isInBusket = ref(inBusket)

        const isNotSmallCount = computed(() => {
            if (count.value > 1) {
                return true
            }
            return false
        })
        const isNotBigCount = computed(() => {
            if (count.value < 20) {
                return true
            }
            return false
        })


        function plusCount() {
            if (isNotBigCount) {
                count.value++
            }
        }
        function minusCount() {
            if (isNotSmallCount) {
                count.value--
            }
        }
        function costString (cost: number) {
			return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸'
		}
        function onMainClick() {
            if (isInBusket.value) {
                changeItemInBusket()
            } else {
                addToBusket()
            }
        }
        function addToBusket() {
            const newItem: ProductInterface = data;
            newItem.count = count.value;

            useBusket().addItemBusket(newItem);

            isInBusket.value = true
        }
        function changeItemInBusket() {
            const newItem: ProductInterface = data;
            newItem.count = count.value;

            useBusket().changeCount(newItem);
        }
        function removeFromBusket() {
            useBusket().delItemBusket(data.id)

            isInBusket.value = false
        }


        return {
            product: props.data?.product,
            count,
            isInBusket,
            isNotSmallCount,
            isNotBigCount,
            plusCount,
            minusCount,
            costString,
            onMainClick,
            addToBusket,
            changeItemInBusket,
            removeFromBusket
        }
    },
})
</script>


<style lang="scss">
.product {
    width: 100%;
    display: flex;
    flex-direction: column;

    &__title {
        margin-bottom: 30px;
    }

    &__content {
        display: flex;
        gap: 50px;
        align-items: flex-start;
    }

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        min-height: 340px;
        width: 100%;
    }

    &__image {
        width: 340px;
        min-width: 340px;
        height: 340px;

        display: flex;
        align-items: center;
        justify-content: center;

        background: rgb(244, 244, 244);

        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    &__cost {
        margin-bottom: 5px;
    }

    &__count {
        margin-bottom: 15px;
        &_num {
            cursor: default;
        }
    }

    &__btns {
        display: flex;
        gap: 10px;
    }

    &__btn {
        width: 175px;

        &_remove {
            width: 110px;
        }
    }
}
</style>
