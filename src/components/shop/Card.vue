<template>
    <q-card class="product-card">
        <q-card-section class="product-card__content">
            <div class="product-card__image" :style="{ backgroundImage: 'url(' + product.image + ')' }">
                <q-icon v-if="product.image.length == 0" name="dashboard" size="xl"></q-icon>
            </div>
            <h6 class="product-card__title">{{ product.name }}</h6>
            <p class="product-card__text">{{ product.description != '-' ? product.description : '' }}</p>

        </q-card-section>
        <q-card-section>
            <q-btn :color="isBusket? 'secondary' : 'primary'" :label="isBusket ? 'In Busket' : costString(item.cost)" class="product-card__btn_add" @click="openProduct" />
        </q-card-section>
    </q-card>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { ProductClass } from 'src/types/product';
import { useProducts } from 'src/stores/products';
import { useRouter } from 'vue-router';


export default defineComponent({
    name: "ProductCard",
    props: {
        item: {
            type: Object as () => ProductClass,
            required: true
        },
        isBusket: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        const { item, isBusket } = props

        const router = useRouter()

        function costString (cost: number) {
			return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸'
		}
        function openProduct () {
            useProducts().setCurProduct(item)
            router.push({ path: "/product" })
        }


        return {
            product: item.product,
            costString,
            openProduct
        }
    },
})
</script>

<style lang="scss">
.product-card {
    width: 190px;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__image {
        width: 158px;
        height: 140px;

        display: flex;
        align-items: center;
        justify-content: center;

        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        margin-bottom: 5px;
    }

    &__title {
        font-size: 18px;
    }

    &__text {
        font-size: 12px;
    }

    &__cost {
        font-size: 16px;
    }

    &__btns-container {
        width: 100%;
        position: absolute;
        bottom: 0;
    }

    &__btn {

        &_add {
            width: 100%;
        }
    }
}
</style>
