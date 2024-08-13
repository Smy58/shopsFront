<template>
    <div class="account-page">
        <h4 class="text-h4 account-page__title">Settings</h4>

        <div class="account-page__content">
            <q-form
                @submit="onSubmit"
                class="account-form q-pa-md"
            >
                <q-input
                    filled
                    v-model="name"
                    label="Your name *"
                    hint="Name and surname"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                    filled
                    v-model="address"
                    label="Your address *"
                    hint="Address"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                    filled
                    v-model="phone"
                    type="tel"
                    label="Your phone *"
                    hint="Phone number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                    filled
                    v-model="mail"
                    label="Your mail"
                    hint="Web mail"
                />

                <div class="account-form__btns">
                    <q-btn label="Submit Changes" type="submit" color="primary"/>
                </div>
            </q-form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const accMock = {
    "id": 1,
    "name": "Kostya",
    "address": "Dostyk 111",
    "phone": "+7 777 666 55 44",
    "mail": null
}

export default defineComponent({
    data() {
        return {
            name: accMock.name,
            address: accMock.address,
            phone: accMock.phone,
            mail: accMock.mail
        }
    },
})
</script>


<style lang="scss">
.account-page {
    display: flex;
    flex-direction: column;
    width: 95%;

    padding: 20px;

    &__title {
        margin-bottom: 20px;
    }

    &__content {
        display: flex;
        gap: 20px;
    }
}

.account-form {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    &__btns {
        margin-top: 15px;
    }
}
</style>
