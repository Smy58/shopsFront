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
import { useShops } from 'src/stores/shops'
import { ShopInterface } from 'src/types/shop'
import { defineComponent, onBeforeMount, ref } from 'vue'
import { getShops } from 'src/boot/shops'

export default defineComponent({
    components: {
        ShopCard
    },
    setup() {
        const shopsData = ref([] as ShopInterface[])

        onBeforeMount( async () => {

            await getShops()
                .then((res) => {
                    useShops().setShops(res)
                })


            shopsData.value = useShops().getShops
        })

        return {
            shopsData
        }
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
