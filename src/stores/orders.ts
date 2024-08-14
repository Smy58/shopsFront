import { defineStore } from 'pinia';
import { OrderInterface } from 'src/types/order';

export const useOrders = defineStore('orders', {
  state: () => ({
    orders: [] as OrderInterface[],
    curOrder: null as OrderInterface | null,

  }),
  getters: {
    getCurOrder: (state) => state.curOrder,
    getOrders: (state) => state.orders
  },
  actions: {
    setCurOrder(item: OrderInterface) {
      this.curOrder = item;

      localStorage.setItem("order", JSON.stringify(this.curOrder))
    },
    setOrders(items: OrderInterface[]) {

        this.orders = items.reverse()

    },
    setFromLocal() {
        const sh = localStorage.getItem("order");
        if (sh) {
            const oldOrder = JSON.parse(sh)
            this.setCurOrder(oldOrder)
        }
    }
  },
});
