<template>
    <q-card class="busket-confirm">
        <q-card-section class="busket-confirm__content">
            <h5 class="busket-confirm__title">Your Busket</h5>
            <div class="busket-confirm__field">
                <p class="busket-confirm__text">Products count:</p>
                <p class="busket-confirm__value">{{ totalCount + ' pcs' }}</p>
            </div>

            <div class="busket-confirm__field">
                <p class="busket-confirm__text_b">Busket cost:</p>
                <p class="busket-confirm__value_b">{{ costString(totalSum) }}</p>
            </div>


        </q-card-section>
        <q-card-section>
            <q-btn color="primary" :disable="isDis" label="Confirm" class="busket-confirm__btn" @click="onBtn"/>

        </q-card-section>

    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "BusketConfirm",
    props: {
        totalSum: {
            type: Number,
            required: true
        },
        totalCount: {
            type: Number,
            required: true
        },
        handleBtn: {
            type: Function,
            required: true
        },
        isDis: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        function onBtn() {
            props.handleBtn()
        };
        function costString (cost: number) {
			return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸'
		};

        return {
            onBtn,
            costString
        }
    }
})
</script>

<style lang="scss">
.busket-confirm {
    min-width: 240px;
    max-height: 230px;

    display: flex;
    flex-direction: column;

    justify-content: space-between;

    &__title {
        margin-bottom: 15px;
    }

    &__field {
        margin-bottom: 7px;

        display: flex;
        justify-content: space-between;
    }

    &__text, &__value {
        font-size: 14px;

        &_b {
            font-weight: bolder;
        }
    }

    &__btn {
        width: 100%;
    }
}
</style>
