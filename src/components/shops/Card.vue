<template>
    <q-card class="shop-card" @click="openShop">
        <q-card-section class="shop-card__content">
            <div class="shop-card__image" :style="{ backgroundImage: 'url(' + item.image + ')' }">
                <q-icon v-if="item.image.length == 0" name="shop" color="grey" size="xl"></q-icon>
            </div>
            <div class="shop-card__info">
                <h5 class="text-h5">{{ item.name }}</h5>
                <p class="text-subtitle2">{{ item.workTimeStart }} - {{ item.workTimeEnd }}</p>

                <p class="text-body1">{{ item.address }}</p>
            </div>
        </q-card-section>
    </q-card>

</template>

<script lang="ts">
import { useShops } from 'src/stores/shops';
import { ShopClass } from 'src/types/shop';
import { defineComponent } from 'vue'

export default defineComponent({
    name: "ShopCard",
    props: {
        item: {
            type: Object as () => ShopClass,
            required: true
        }
    },
    methods: {
        openShop () {
            useShops().setCurShop(this.item)
            this.$router.push({ path: "/shop" })
        }
    },
    setup() {

    },
})
</script>

<style lang="scss">
.shop-card {

    height: 150px;
    cursor: pointer;

    &__content {
        height: 150px;

        display: flex;
        flex-direction: row;
        align-items: center;

        gap: 15px;
    }

    &__image {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

}
</style>
