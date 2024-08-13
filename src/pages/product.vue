<template>
    <div class="product-page">
        <q-btn round color="secondary" icon="close" class="product-page__close" @click="goBack" />
        <Product :data="productData" :inBusket="isInBusket" />
    </div>
</template>

<script lang="ts">
import Product, { ProductInfoProps } from 'components/product/Product.vue'
import { defineComponent } from 'vue'
import { useProducts } from 'src/stores/products';
import { ProductInterface } from 'src/types/product';
import { useBusket } from 'src/stores/busket';


// const productMock: ProductInfoProps = {
//         "id": 1,
//         "shopId": 2,
//         "cost": 384,
//         "product": {
//             "id": 5,
//             "name": "dog food",
//             "description": "-",
//             "vendorCost": 247,
//             "image": "img link",
//             "group": {
//                 "id": 4,
//                 "name": "Pet food"
//             }
//         }
//     }

export default defineComponent({
    components: {
        Product
    },

    beforeMount() {
        useBusket().setFromLocal()
        useProducts().setFromLocal();

        const curProduct = useProducts().getCurProduct
        this.productData = curProduct

        const busketData = useBusket().getBusket

        const itemInBusket = busketData.find(e => e.id === curProduct?.id)
        if (itemInBusket) {
            this.isInBusket = true
            this.productData = itemInBusket
        }
    },
    data() {
        return {
            productData: {} as ProductInterface | null,
            isInBusket: false
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
    setup() {

    },
})
</script>


<style lang="scss">
.product-page {
    padding: 20px;
    width: 90%;
    position: relative;

    &__close {
        position: fixed;
        top: 70px;
        right: 20px;
    }


    &__title {
        margin-bottom: 20px;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }
}


</style>
