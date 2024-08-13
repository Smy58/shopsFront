<template>
    <div class="filter">
        <q-select rounded outlined
            :dense="true"
            v-model="group"
            :options="groupsList"
            label="group"
            class="filter__select" />

        <q-input rounded outlined
            v-model="text"
            :dense="true"
            label="Search"
            class="filter__search" />

        <div class="">
            <q-btn round color="primary" icon="search" />

        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "ShopFilter",
    props: {
        groupsList: {
            type: Array,
            required: true
        }
    }
})
</script>

<style lang="scss">

</style>
