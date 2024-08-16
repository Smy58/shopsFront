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
import { defineComponent, onBeforeMount, ref } from 'vue'
import { ProductInterface } from 'src/types/product'
import { getProducts } from 'boot/products'
import { getGroups } from 'boot/groups'
import { useProducts } from 'src/stores/products'
import { useGroups } from 'src/stores/groups'
import { GroupInterface } from 'src/types/group'


export default defineComponent({
    components: {
        ProductCard,
        ShopFilter
    },
    setup() {
        const shopData = ref({} as ShopInterface | null);
        const busket = ref([] as ProductInterface[]);
        const shopProducts = ref([] as ProductInterface[]);
        const groupsData = ref([] as GroupInterface[]);
        const group = ref({} as GroupInterface | null);
        const currentPage = ref(1);
        const curGroupId = ref(0);
        const curSearch = ref('');
        const maxPages = ref(1);

        function checkItemBusket(item: ProductInterface) {
            const itemInBusket = busket.value.find(e => e.id === item?.id)
            if (itemInBusket) {
                return true
            }
            return false
        };
        async function onFind(params: { groupId?: number, searchInput?: string}){
            curGroupId.value = params.groupId ? params.groupId : 0
            curSearch.value = params.searchInput ? params.searchInput : ''

            handleSearch()
        };
        async function handleSearch() {
            if (shopData.value){

                const newParams: { groupId?: number, searchInput?: string} = {}
                if (curGroupId.value != 0) {
                    newParams.groupId = curGroupId.value
                }
                if (curSearch.value != '') {
                    newParams.searchInput = curSearch.value
                }


                await getProducts(shopData.value.id, currentPage.value, newParams)
                    .then((res) => {
                        useProducts().setProducts(res.products)
                        maxPages.value = res.pages

                    })
                shopProducts.value = useProducts().getProducts
            }
        }

        onBeforeMount(async () => {
            useShops().setFromLocal();

            const curShop = useShops().getCurShop
            shopData.value = curShop

            const busketData = useBusket().getBusket
            busket.value = busketData

            if (shopData.value?.id) {
                await getProducts(shopData.value.id, 1, {})
                    .then((res) => {
                        useProducts().setProducts(res.products)
                        maxPages.value = res.pages

                    })
                shopProducts.value = useProducts().getProducts
            }

            await getGroups()
                .then((res) => {
                    useGroups().setGroups(res)
                })
            groupsData.value = useGroups().getGroups
        })

        return {
            shopData,
            busket,
            shopProducts,
            groupsData,
            group,
            currentPage,
            curGroupId,
            curSearch,
            maxPages,
            checkItemBusket,
            onFind,
            handleSearch
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
