<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Shop application
        </q-toolbar-title>

        <router-link to="/account" >
            <q-chip
            color="primary" text-color="white"
            >
                <q-avatar color="white" text-color="primary">{{ userName[0] }}</q-avatar>
                {{userName}}
            </q-chip>
        </router-link>

      </q-toolbar>
    </q-header>

    <q-drawer :width="190"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-btn flat icon="logout" color="red" label="Exit" class="logout" @click="logout"/>

    </q-drawer>



    <q-page-container class="page">
        <router-view />

        <q-dialog v-model="dialog" seamless position="top" class="page__dialog">
            <q-card class="page__dialog-card">
                <p class="text-subtitle1">{{ dialogMes }}</p>
                <q-btn icon="close" flat round dense v-close-popup class="page__dialog-close" @click="closeDialog" />
            </q-card>
        </q-dialog>
    </q-page-container>
  </q-layout>
</template>





<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useUsers } from 'stores/user'
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import { useRouter } from 'vue-router';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Shops',
    icon: 'store',
    link: '/'
  },
  {
    title: 'Busket',
    icon: 'shopping_basket',
    link: '/busket'
  },
  {
    title: 'My Orders',
    icon: 'bookmark_border',
    link: '/orders'
  }
];


export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  setup () {
    const leftDrawerOpen = ref(false);

    const dialog = ref(false);
    const dialogMes = ref('');

    const router = useRouter()

    const userName = computed(() => {

        useUsers().setFromLocal()

        const name = useUsers().getUserName
        return name
    })

    function logout() {
        useUsers().clearUser()
        router.push('/login')
    }
    function closeDialog() {
        localStorage.removeItem("dialogMes")
    }

    onBeforeMount(() => {

        const cont = localStorage.getItem("dialogMes")
        dialogMes.value = cont ? cont : ''
        dialog.value = cont ? true : false

    })


    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      dialog,
      dialogMes,
      userName,
      logout,
      closeDialog
    };
  }
});
</script>

<style lang="scss">
.page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__dialog {

        &-card {
            width: 350px;
            padding: 20px;
        }

        &-close {
            position: absolute;
            top: 20px;
            right: 20px;
        }
    }
}

.logout {
    position: absolute;
    bottom: 20px;
    left: 20px;
}

</style>
