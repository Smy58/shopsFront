<template>
    <div class="shop-page">
        <h4 class="text-h4 shop-page__title">{{ shopData?.name }}</h4>

        <div class="shop-page__content">
            <ShopFilter :groupsData="groupsData" :onFind="onFind" />

            <div class="shop-page__list">
                <ProductCard v-for="item in shopProducts" :isBusket="checkItemBusket(item)" :key="item.id" :item="item" />
            </div>

            <q-pagination
                class="shop-page__pagination"
                v-model="currentPage"
                @click="handleSearch()"
                :max="maxPages"
                direction-links
                flat
                color="grey"
                active-color="primary"
            />
        </div>

    </div>
</template>

<script lang="ts">
import ProductCard from 'components/shop/Card.vue'
import ShopFilter from 'components/shop/Filter.vue'
import { useShops } from 'src/stores/shops'
import { useBusket } from 'src/stores/busket'
import { ShopInterface } from 'src/types/shop'
import { defineComponent, ref } from 'vue'
import { ProductInterface } from 'src/types/product'
import { getProducts } from 'src/api/products'
import { getGroups } from 'src/api/groups'
import { useProducts } from 'src/stores/products'
import { useGroups } from 'src/stores/groups'
import { GroupInterface } from 'src/types/group'


export default defineComponent({
    components: {
        ProductCard,
        ShopFilter
    },
    async beforeMount() {
        useShops().setFromLocal();

        const curShop = useShops().getCurShop
        this.shopData = curShop

        const busketData = useBusket().getBusket
        this.busket = busketData

        if (this.shopData?.id) {
            await getProducts(this.shopData.id, 1, {})
                .then((res) => {
                    useProducts().setProducts(res.products)
                    this.maxPages = res.pages

                })
            this.shopProducts = useProducts().getProducts
        }

        await getGroups()
            .then((res) => {
                useGroups().setGroups(res)
            })
        this.groupsData = useGroups().getGroups

    },
    data() {
        return {
            shopData: {} as ShopInterface | null,
            busket: [] as ProductInterface[],
            shopProducts: [] as ProductInterface[],
            groupsData: [] as GroupInterface[],
            group: {} as GroupInterface | null,
            currentPage: 1,
            curGroupId: 0,
            curSearch: '',
            maxPages: 1
        }
    },

    methods: {
        checkItemBusket(item: ProductInterface) {
            const itemInBusket = this.busket.find(e => e.id === item?.id)
            if (itemInBusket) {
                return true
            }
            return false
        },
        async onFind(params: { groupId?: number, searchInput?: string}){
            this.curGroupId = params.groupId ? params.groupId : 0
            this.curSearch = params.searchInput ? params.searchInput : ''

            this.handleSearch()
        },
        async handleSearch() {
            if (this.shopData){

                const newParams: { groupId?: number, searchInput?: string} = {}
                if (this.curGroupId != 0) {
                    newParams.groupId = this.curGroupId
                }
                if (this.curSearch != '') {
                    newParams.searchInput = this.curSearch
                }


                await getProducts(this.shopData.id, this.currentPage, newParams)
                    .then((res) => {
                        useProducts().setProducts(res.products)
                        this.maxPages = res.pages

                    })
                this.shopProducts = useProducts().getProducts
            }
        }
    }
})
</script>

<style lang="scss">
.shop-page {
    padding: 20px;


    &__title {
        margin-bottom: 20px;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    &__pagination {
        align-self: center;
    }

    &__content {
        display: flex;
        flex-direction: column;
    }
}




</style>
