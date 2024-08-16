import { defineStore } from 'pinia';
import { UserInterface } from 'src/types/user';

export const useUsers = defineStore('users', {
  state: () => ({
    curUser: null as UserInterface | null,
    curName: ''

  }),
  getters: {
    getCurUser: (state) => state.curUser,
    getUserName: (state) => state.curName
  },
  actions: {
    setCurUser(item: UserInterface) {

        this.curUser = item;
        this.curName = item.name;

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
        this.curUser = null
        this.curName = ''
    }
  },
});
