import { defineStore } from 'pinia';
import { GroupInterface } from 'src/types/group';

export const useGroups = defineStore('groups', {
  state: () => ({
    groups: [] as GroupInterface[],
    curGroup: null as GroupInterface | null,

  }),
  getters: {
    getCurGroup: (state) => state.curGroup,
    getGroups: (state) => state.groups
  },
  actions: {
    setCurGroup(item: GroupInterface) {
      this.curGroup = item;

      localStorage.setItem("group", JSON.stringify(this.curGroup))
    },
    setGroups(items: GroupInterface[]) {
        this.groups = items

    },
    setFromLocal() {
        const sh = localStorage.getItem("group");
        if (sh) {
            const oldGroup = JSON.parse(sh)
            this.setCurGroup(oldGroup)
        }
    }
  },
});
