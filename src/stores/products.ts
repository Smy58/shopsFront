import { defineStore } from 'pinia';
import { ProductInterface } from 'src/types/product';

export const useProducts = defineStore('products', {
  state: () => ({
    products: [] as ProductInterface[],
    curProduct: null as ProductInterface | null,

  }),
  getters: {
    getCurProduct: (state) => state.curProduct,
    getProducts: (state) => state.products
  },
  actions: {
    setCurProduct(item: ProductInterface) {
        this.curProduct = item;

        localStorage.setItem("product", JSON.stringify(this.curProduct))

    },
    setProducts (items: ProductInterface[]) {
        this.products = items
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
