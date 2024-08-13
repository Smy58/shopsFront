import { defineStore } from 'pinia';
import { ProductInterface } from 'src/types/product';

export const useProducts = defineStore('products', {
  state: () => ({
    products: [] as ProductInterface[],
    curProduct: null as ProductInterface | null,

  }),
  getters: {
    getCurProduct: (state) => state.curProduct,
  },
  actions: {
    setCurProduct(item: ProductInterface) {
        this.curProduct = item;
        console.log(item);

        localStorage.setItem("product", JSON.stringify(this.curProduct))

    },
    setFromLocal() {
        const pr = localStorage.getItem("product");
        if (pr) {
            const oldProduct = JSON.parse(pr)
            this.setCurProduct(oldProduct)
        }
    }
  },
});
