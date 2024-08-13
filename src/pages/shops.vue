<template>
    <div class="shops">
        <h4 class="text-h4 shops__title">Shops</h4>
        <div class="shops__content">
            <div class="shops__list">
                <ShopCard v-for="item in shopsMock" :key="item.id" :item="item" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ShopCard, { ShopCardProps } from 'components/shops/Card.vue'
import { defineComponent } from 'vue'

const shopsMock: ShopCardProps[] = [
    {
        id: 2,
        name: "Second Shop",
        address: "Tole bi 112",
        workTimeStart: "12:00",
        workTimeEnd: "18:00",
        waitingTime: 30,
        image: "https://content.jdmagicbox.com/comp/alwar/t2/9999px144.x144.190825233053.l1t2/catalogue/smart-mart-janaksinghpura-alwar-grocery-stores-uy6h6t2q2e.jpg"
    },
    {
        id: 4,
        name: "first Shop",
        address: "Tole bi 112",
        workTimeStart: "09:00",
        workTimeEnd: "18:00",
        waitingTime: 30,
        image: ""
    }
]

export default defineComponent({
    components: {
        ShopCard
    },
    setup() {
        return {
            shopsMock
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
