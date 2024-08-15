<template>
    <div class="shops">
        <h4 class="text-h4 shops__title">Shops</h4>
        <div class="shops__content">
            <div class="shops__list">
                <ShopCard v-for="item in shopsData" :key="item.id" :item="item" />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import ShopCard from 'components/shops/Card.vue'
import { getShops } from 'src/api/shops'
import { useShops } from 'src/stores/shops'
import { ShopInterface } from 'src/types/shop'
import { defineComponent } from 'vue'


export default defineComponent({
    components: {
        ShopCard
    },
    data() {
        return {
            shopsData: [] as ShopInterface[],
        }
    },
    async beforeMount() {


        await getShops()
            .then((res) => {
                useShops().setShops(res)
            })

        this.shopsData = useShops().getShops
    },

})
</script>

<style lang="scss">

.shops {
    padding: 30px;
    display: flex;
    flex-direction: column;
    width: 90%;

    &__title {
        margin-bottom: 20px;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }


}


</style>
