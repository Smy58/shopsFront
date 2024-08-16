<template>
    <div class="login-page">
        <div class="login">
            <q-form
                @submit="onLogin"
                class="login-form form q-pa-md"
            >
                <q-input
                    filled
                    v-model="login"
                    label="Your mail or phone"
                    hint="Login mail or phone"
                    class="form__input"
                    lazy-rules
                    :rules="loginRules"
                />

                <q-input
                    filled
                    v-model="password"
                    :type="isPwd ? 'password' : 'text'"
                    label="Your password"
                    class="form__input"
                    lazy-rules
                    :rules="passwordRules"
                >
                    <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                    </template>
                </q-input>

                <q-btn label="Login" type="submit" color="primary" class="form__btn" />
                <p class="form__error" v-if="errorMessage">{{ errorMessage }}</p>
                <p class="form__link">Don’t have an account? <router-link to="/signup">Sign Up</router-link></p>
            </q-form>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useUsers } from 'stores/user'
import { loginUser } from 'boot/user'
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const loginRules = [
            (val: string) => val && val.length > 0 || 'It can not be empty',
            (val: string) => (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)) || "It's not email or phone",
        ]

        const passwordRules = [ (val: string) => val && val.length > 5 || 'Need more than 5 symbols']

        const login = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const isPwd = ref(true);

        const router = useRouter()

        async function onLogin() {
            loginUser({login: login.value, password: password.value})
                .then((res) => {
                    if (!res.message) {

                        useUsers().setCurUser(res.user)
                        localStorage.setItem("dialogMes", "Successful login")
                        localStorage.setItem("token", res.token)
                        router.push('/')
                    } else {
                        errorMessage.value = res.message
                    }

                })
                .catch((err) => {
                    errorMessage.value = err.message

                })
        }

        onBeforeMount(() => {

            useUsers().setFromLocal()

            const user = useUsers().getCurUser
            if (user) {
                router.push('/')
            }

        })

        return {
            loginRules, passwordRules,
            login,
            password,
            errorMessage,
            isPwd,
            onLogin
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
