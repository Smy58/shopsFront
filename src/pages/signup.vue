<template>
    <div class="signup-page">
        <div class="signup">
            <q-form
                @submit="onSubmit"
                class="signup-form form q-pa-md"
            >
                <h2 class="text-h5">Create account</h2>

                <q-input
                    filled
                    v-model="name"
                    label="Your name *"
                    hint="Name and surname"
                    class="form__input"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                    filled
                    v-model="mail"
                    type="mail"
                    label="Your mail *"
                    hint="Web mail"
                    class="form__input"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                    filled
                    v-model="password"
                    type="password"
                    label="Your password *"
                    class="form__input"
                    lazy-rules
                    :rules="[ val => val && val.length > 5 || 'Please type something']"
                />

                <q-input
                    filled
                    v-model="password"
                    type="password"
                    label="Repeat password *"
                    class="form__input"
                    lazy-rules
                    :rules="[ val => val && val.length > 5 || 'Please type something']"
                />

                <q-input
                    filled
                    v-model="mail"
                    type="tel"
                    label="Your Phone *"
                    hint="phone number"
                    class="form__input"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                    filled
                    v-model="address"
                    label="Your address *"
                    hint="Address"
                    class="form__input"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />


                <q-btn label="Sign up" type="submit" color="primary" class="form__btn"/>
                <p class="form__link">Already have an account? <router-link to="/signup">Log in</router-link></p>
            </q-form>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

    },
})
</script>

<style lang="scss">
.signup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.signup-form {

    width: 320px;

}

.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    &__btn, &__input {
        width: 100%;
    }
}
</style>
