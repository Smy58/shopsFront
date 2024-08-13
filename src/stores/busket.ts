import { defineStore } from 'pinia';
import { ProductInterface } from 'src/types/product';

// import { BusketInterface } from 'src/types/busket';

export const useBusket = defineStore('busket', {
  state: () => ({
    busket: [] as ProductInterface[],

  }),
  getters: {
    getBusket: (state) => state.busket,
  },
  actions: {
    addItemBusket(item: ProductInterface) {
        this.busket.push(item);

        console.log(this.busket);

        localStorage.setItem("busket", JSON.stringify(this.busket))
    },
    delItemBusket(id: number) {

        const newItems = this.busket;
		const ind = newItems.findIndex((item) => item.id == id);
		newItems.splice(ind, 1)

        this.busket = newItems;

        localStorage.setItem("busket", JSON.stringify(this.busket))

    },
    changeCount(changedItem: ProductInterface) {
		const newItems = this.busket;

		newItems.map((item) => {
			if (item.id == changedItem.id) {
				item.count = changedItem.count;
			}
		})
		this.busket = newItems

        localStorage.setItem("busket", JSON.stringify(this.busket))

	},
    setBusket(items: ProductInterface[]) {
        this.busket = items
        console.log(this.busket);

    },
    setFromLocal() {
        const bs = localStorage.getItem("busket");
        if (bs) {
            const oldBusket = JSON.parse(bs)
            this.setBusket(oldBusket)
        }
    }
  },
});
