<template>
    <div class="signup-page">
        <div class="signup">
            <q-form
                @submit="onSignup"
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
                    :rules="nameRules"
                />
                <q-input
                    filled
                    v-model="mail"
                    type="email"
                    label="Your mail *"
                    hint="Web mail"
                    class="form__input"
                    lazy-rules
                    :rules="mailRules"
                />

                <q-input
                    filled
                    v-model="password"
                    type="password"
                    label="Your password *"
                    class="form__input"
                    lazy-rules
                    :rules="passwordRules"
                />

                <q-input
                    filled
                    v-model="repPassword"
                    type="password"
                    label="Repeat password *"
                    class="form__input"
                    lazy-rules
                    :rules="passwordRules"
                />

                <q-input
                    filled
                    v-model="phone"
                    type="tel"
                    label="Your Phone *"
                    hint="phone number"
                    class="form__input"
                    lazy-rules
                    :rules="phoneRules"
                />

                <q-input
                    filled
                    v-model="address"
                    label="Your address *"
                    hint="Address"
                    class="form__input"
                    lazy-rules
                    :rules="addressRules"
                />


                <q-btn label="Sign up" type="submit" color="primary" class="form__btn" />
                <p class="form__error" v-if="errorMessage">{{ errorMessage }}</p>
                <p class="form__link">Already have an account? <router-link to="/login">Log in</router-link></p>
            </q-form>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { signupUser } from 'boot/user'
import { useUsers } from 'stores/user'
import { signupUserParams } from 'src/types/user';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const mailRules = [
            (val: string) => val && val.length > 0 || 'Email can not be empty',
            (val: string) => (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)) || "It's not email",
        ];
        const phoneRules = [
            (val: string) => val && val.length > 0 || 'Email can not be empty',
            (val: string) => (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(val)) || "It's not phone",
        ];
        const passwordRules = [ (val: string) => val && val.length > 5 || 'Need more than 5 symbols']
        const nameRules = [ (val: string) => val && val.length > 1 || 'Need more than 1 symbols']
        const addressRules = [ (val: string) => val && val.length > 5 || 'Need more than 5 symbols']

        const mail = ref('');
        const password = ref('');
        const repPassword = ref('');
        const name = ref('');
        const address = ref('');
        const phone = ref('');
        const errorMessage = ref('');

        const router = useRouter()

        async function onSignup() {
            if (password.value === repPassword.value) {
                const params: signupUserParams = {
                    name: name.value,
                    address: address.value,
                    phone: phone.value,
                    mail: mail.value,
                    password: password.value,
                }

                signupUser(params)
                    .then((res) => {
                        if (!res.message) {
                            useUsers().setCurUser(res)
                            localStorage.setItem("dialogMes", "Successful creating user, logged in")
                            router.push('/')
                        } else {
                            errorMessage.value = res.message
                        }
                    })
                    .catch((err) => {
                        errorMessage.value = err.message
                    })
            } else {
                errorMessage.value = "Passwords must be identical"
            }
        }

        onBeforeMount(() => {
            useUsers().setFromLocal()

            const user = useUsers().getCurUser
            if (user) {
                router.push('/')
            }
        })

        return {
            mailRules, phoneRules, passwordRules, nameRules, addressRules,
            mail,
            password,
            repPassword,
            name,
            address,
            phone,
            errorMessage,
            onSignup
        }
    }

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
