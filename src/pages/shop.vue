<template>
    <div class="shop-page">
        <h4 class="text-h4 shop-page__title">{{ shopData.name }}</h4>

        <div class="shop-page__content">
            <ShopFilter />

            <div class="shop-page__list">
                <ProductCard v-for="item in shopProductsMock" :isBusket="checkItemBusket(item)" :key="item.id" :item="item" />
            </div>

            <q-pagination
                class="shop-page__pagination"
                v-model="currentPage"
                max="5"
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

const groupsMock = [
    {
        "id": 1,
        "name": "Food"
    },
    {
        "id": 2,
        "name": "Milk product"
    },
    {
        "id": 3,
        "name": "Toys"
    },
    {
        "id": 4,
        "name": "Pet food"
    },
    {
        "id": 5,
        "name": "Cleaning products"
    }
]

const shopProductsMock: ProductInterface[] = [
    {
        "id": 1,
        "shopId": 2,
        "cost": 384,
        "product": {
            "id": 5,
            "name": "dog food",
            "description": "-",
            "vendorCost": 247,
            "image": "https://i5.walmartimages.com/seo/Pure-Balance-Chicken-Pea-Recipe-Dry-Dog-Food-Grain-Free-24-lbs_6d926d5c-aa7f-4365-907f-d78d56d4840a.beab1ab6418e5ebc18a173787b03e5b3.jpeg",
            "group": {
                "id": 4,
                "name": "Pet food"
            }
        }
    },
    {
        "id": 2,
        "shopId": 2,
        "cost": 421,
        "product": {
            "id": 6,
            "name": "pet care",
            "description": "-",
            "vendorCost": 251,
            "image": "",
            "group": {
                "id": 4,
                "name": "Pet food"
            }
        }
    },
    {
        "id": 3,
        "shopId": 2,
        "cost": 516,
        "product": {
            "id": 7,
            "name": "cat food",
            "description": "-",
            "vendorCost": 219,
            "image": "",
            "group": {
                "id": 4,
                "name": "Pet food"
            }
        }
    },
    {
        "id": 4,
        "shopId": 2,
        "cost": 1112,
        "product": {
            "id": 8,
            "name": "whole milk",
            "description": "-",
            "vendorCost": 928,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 5,
        "shopId": 2,
        "cost": 2161,
        "product": {
            "id": 9,
            "name": "butter milk",
            "description": "-",
            "vendorCost": 1915,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 6,
        "shopId": 2,
        "cost": 1065,
        "product": {
            "id": 10,
            "name": "curd cheese",
            "description": "-",
            "vendorCost": 973,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 7,
        "shopId": 2,
        "cost": 1543,
        "product": {
            "id": 11,
            "name": "processed cheese",
            "description": "-",
            "vendorCost": 1417,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 8,
        "shopId": 2,
        "cost": 991,
        "product": {
            "id": 12,
            "name": "condensed milk",
            "description": "-",
            "vendorCost": 749,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 9,
        "shopId": 2,
        "cost": 1437,
        "product": {
            "id": 13,
            "name": "hard cheese",
            "description": "-",
            "vendorCost": 1212,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 10,
        "shopId": 2,
        "cost": 1672,
        "product": {
            "id": 14,
            "name": "cream cheese ",
            "description": "-",
            "vendorCost": 1485,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 11,
        "shopId": 2,
        "cost": 1974,
        "product": {
            "id": 15,
            "name": "sliced cheese",
            "description": "-",
            "vendorCost": 1709,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 12,
        "shopId": 2,
        "cost": 1023,
        "product": {
            "id": 16,
            "name": "specialty cheese",
            "description": "-",
            "vendorCost": 1015,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 13,
        "shopId": 2,
        "cost": 1086,
        "product": {
            "id": 17,
            "name": "spread cheese",
            "description": "-",
            "vendorCost": 1027,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 14,
        "shopId": 2,
        "cost": 962,
        "product": {
            "id": 18,
            "name": "soft cheese",
            "description": "-",
            "vendorCost": 884,
            "image": "",
            "group": {
                "id": 2,
                "name": "Milk product"
            }
        }
    },
    {
        "id": 15,
        "shopId": 2,
        "cost": 2673,
        "product": {
            "id": 20,
            "name": "cleaner",
            "description": "-",
            "vendorCost": 2394,
            "image": "",
            "group": {
                "id": 5,
                "name": "Cleaning products"
            }
        }
    },
    {
        "id": 16,
        "shopId": 2,
        "cost": 1721,
        "product": {
            "id": 21,
            "name": "shopping bags",
            "description": "-",
            "vendorCost": 1483,
            "image": "",
            "group": {
                "id": 5,
                "name": "Cleaning products"
            }
        }
    },
    {
        "id": 17,
        "shopId": 2,
        "cost": 2265,
        "product": {
            "id": 22,
            "name": "dish cleaner",
            "description": "-",
            "vendorCost": 2261,
            "image": "",
            "group": {
                "id": 5,
                "name": "Cleaning products"
            }
        }
    },
    {
        "id": 18,
        "shopId": 2,
        "cost": 2735,
        "product": {
            "id": 23,
            "name": "pet care",
            "description": "-",
            "vendorCost": 2703,
            "image": "",
            "group": {
                "id": 5,
                "name": "Cleaning products"
            }
        }
    },
    {
        "id": 19,
        "shopId": 2,
        "cost": 2845,
        "product": {
            "id": 24,
            "name": "soap",
            "description": "-",
            "vendorCost": 2581,
            "image": "",
            "group": {
                "id": 5,
                "name": "Cleaning products"
            }
        }
    },
    {
        "id": 20,
        "shopId": 2,
        "cost": 2980,
        "product": {
            "id": 25,
            "name": "house keeping products",
            "description": "-",
            "vendorCost": 2832,
            "image": "",
            "group": {
                "id": 5,
                "name": "Cleaning products"
            }
        }
    }
]

const shopMock = {
    id: 2,
    name: "Second Shop",
    address: "Tole bi 112",
    workTimeStart: "12:00",
    workTimeEnd: "18:00",
    waitingTime: 30,
    image: "image url"
}

export default defineComponent({
    components: {
        ProductCard,
        ShopFilter
    },
    beforeMount() {
        useShops().setFromLocal();

        const curShop = useShops().getCurShop
        this.shopData = curShop

        const busketData = useBusket().getBusket
        this.busket = busketData
        console.log(this.busket);

    },
    data() {
        return {
            shopData: {} as ShopInterface | null,
            busket: [] as ProductInterface[],
            currentPage: 1
        }
    },
    methods: {
        checkItemBusket(item: ProductInterface) {
            const itemInBusket = this.busket.find(e => e.id === item?.id)
            if (itemInBusket) {
                return true
            }
            return false
        }
    },
    setup() {

        const groupsList: string[] = []
        groupsMock.forEach((item) => {
            groupsList.push(item.name)
        })

        return {
            group: ref(null),
            shopProductsMock,
            groupsList
        }
    },
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

.filter {
    width: 100%;
    display: grid;
    grid-template-columns: 5fr 15fr 1fr;

    padding: 0 25px;
    box-sizing: border-box;

    margin-bottom: 25px;
    gap: 10px;

    &__select {
        min-width: 170px;
    }

}


</style>
