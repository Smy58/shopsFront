<template>
    <div class="filter">
        <q-select rounded outlined
            :dense="true"
            v-model="group"
            :options="groupsList"
            label="group"
            class="filter__select" />

        <q-input rounded outlined
            v-model="searchInput"
            :dense="true"
            label="Search"
            class="filter__search" />

        <div class="">
            <q-btn round color="primary" icon="search" @click="onSearch" />

        </div>
    </div>
</template>


<script lang="ts">
import { GroupClass } from 'src/types/group';
import { defineComponent } from 'vue'

export default defineComponent({
    name: "ShopFilter",
    props: {
        groupsData: {
            type: Array as () => GroupClass[],
            required: true
        },
        onFind: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            searchInput: '',
            group: ''
        }
    },
    methods: {
        onSearch() {
            const ind = this.groupsData.find((el) => el.name === this.group)

            this.onFind({searchInput: this.searchInput, groupId: ind?.id})
        }
    },
    computed: {
        groupsList() {
            const groupsList: string[] = []
            groupsList.push('All')
            this.groupsData.forEach((item) => {
                groupsList.push(item.name)
            })
            return groupsList;
        }
    },
})
</script>

<style lang="scss">
.filter {
    width: 100%;
    display: grid;
    grid-template-columns: 5fr 15fr 1fr;

    padding: 0 25px;
    box-sizing: border-box;

    margin-bottom: 25px;
    gap: 10px;

    &__select {
        min-width: 170px;
    }

}
</style>
