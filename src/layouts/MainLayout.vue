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
                <q-avatar color="white" text-color="primary">J</q-avatar>
                Jasmin P.
            </q-chip>
        </router-link>

      </q-toolbar>
    </q-header>

    <q-drawer width="190"
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
      <q-btn flat icon="logout" color="red" label="Exit" class="logout"/>

    </q-drawer>

    <q-page-container class="page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>





<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

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


    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
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
}

.logout {
    position: absolute;
    bottom: 20px;
    left: 20px;
}

</style>
