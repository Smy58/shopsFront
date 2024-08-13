<template>
    <div class="login-page">
        <div class="login">
            <q-form
                @submit="onSubmit"
                class="login-form form q-pa-md"
            >
                <q-input
                    filled
                    v-model="mail"
                    type="mail"
                    label="Your mail"
                    hint="Web mail"
                    class="form__input"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                    filled
                    v-model="password"
                    type="password"
                    label="Your password"
                    class="form__input"
                    lazy-rules
                    :rules="[ val => val && val.length > 5 || 'Please type something']"
                />

                <q-btn label="Login" type="submit" color="primary" class="form__btn"/>
                <p class="form__link">Don’t have an account? <router-link to="/signup">Sign Up</router-link></p>
            </q-form>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            mail: '',
            password: ''
        }
    }
})
</script>

<style lang="scss">


.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.login-form {

    width: 280px;

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
