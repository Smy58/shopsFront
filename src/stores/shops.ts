import { defineStore } from 'pinia';
import { ShopInterface } from 'src/types/shop';

export const useShops = defineStore('shops', {
  state: () => ({
    shops: [] as ShopInterface[],
    curShop: null as ShopInterface | null,

  }),
  getters: {
    getCurShop: (state) => state.curShop,
    getShops: (state) => state.shops
  },
  actions: {
    setCurShop(item: ShopInterface) {
      this.curShop = item;

      localStorage.setItem("shop", JSON.stringify(this.curShop))
    },
    setShops(items: ShopInterface[]) {
        this.shops = items

    },
    setFromLocal() {
        const sh = localStorage.getItem("shop");
        if (sh) {
            const oldShop = JSON.parse(sh)
            this.setCurShop(oldShop)
        }
    }
  },
});
