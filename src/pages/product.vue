<template>
    <div class="product-page">
        <q-btn round color="secondary" icon="close" class="product-page__close" @click="goBack" />
        <Product :data="productData" :inBusket="isInBusket" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import Product from 'components/product/Product.vue'
import { useProducts } from 'src/stores/products';
import { useBusket } from 'src/stores/busket';
import { ProductInterface } from 'src/types/product';
import { useRouter } from 'vue-router';


export default defineComponent({
    components: {
        Product
    },
    setup() {
        const productData = ref({} as ProductInterface);
        const isInBusket = ref(false);

        const router = useRouter()

        function goBack() {
            router.go(-1)
        }

        onBeforeMount(() => {
            useBusket().setFromLocal()
            useProducts().setFromLocal();

            const curProduct = useProducts().getCurProduct
            if (curProduct){
                productData.value = curProduct
            }

            const busketData = useBusket().getBusket

            const itemInBusket = busketData.find(e => e.id === curProduct?.id)
            if (itemInBusket) {
                isInBusket.value = true
                productData.value = itemInBusket
            }
        })

        return {
            productData,
            isInBusket,
            goBack
        }
    }
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
