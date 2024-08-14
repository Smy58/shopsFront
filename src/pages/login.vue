<template>
    <div class="login-page">
        <div class="login">
            <q-form
                @submit="onSubmit"
                class="login-form form q-pa-md"
            >
                <q-input
                    filled
                    v-model="login"
                    label="Your mail or phone"
                    hint="Login mail or phone"
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

                <q-btn label="Login" type="submit" color="primary" class="form__btn" @click.prevent="onLogin"/>
                <p class="form__error" v-if="errorMessage">{{ errorMessage }}</p>
                <p class="form__link">Don’t have an account? <router-link to="/signup">Sign Up</router-link></p>
            </q-form>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUsers } from 'stores/user'
import { loginUser } from 'src/api/user'

export default defineComponent({
    data() {
        return {
            login: '',
            password: '',
            errorMessage: ''
        }
    },
    beforeMount() {
        useUsers().setFromLocal()

        const user = useUsers().getCurUser
        if (user) {
            this.$router.push('/')
        }
    },
    methods: {
        async onLogin() {
            loginUser({login: this.login, password: this.password})
                .then((res) => {
                    console.log(res);
                    if (!res.message) {
                        useUsers().setCurUser(res)
                        this.$router.push('/')
                    } else {
                        console.log('ERROR');
                        this.errorMessage = res.message
                    }

                })
                .catch((err) => {
                    console.log(err);

                })
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

    &__error {
        color: #C10015;
        font-weight: bolder;
    }
}
</style>
