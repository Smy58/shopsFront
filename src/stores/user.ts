import { defineStore } from 'pinia';
import { UserInterface } from 'src/types/user';

export const useUsers = defineStore('users', {
  state: () => ({
    curUser: null as UserInterface | null,

  }),
  getters: {
    getCurUser: (state) => state.curUser,
    getUserName: (state) => state.curUser?.name
  },
  actions: {
    setCurUser(item: UserInterface) {
      this.curUser = item;

      localStorage.setItem("user", JSON.stringify(this.curUser))
    },
    setFromLocal() {
        const sh = localStorage.getItem("user");
        if (sh) {
            const oldUser = JSON.parse(sh)
            this.setCurUser(oldUser)
        }
    },
    clearUser() {
        localStorage.removeItem('user')
    }
  },
});
