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
import { defineComponent } from 'vue'
import { signupUser } from 'src/api/user'
import { useUsers } from 'stores/user'
import { signupUserParams } from 'src/types/user';

export default defineComponent({
    data() {
        return {
            mail: '',
            password: '',
            repPassword: '',
            name: '',
            address: '',
            phone: '',
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
        async onSignup() {

            if (this.password === this.repPassword) {
                const params: signupUserParams = {
                    name: this.name,
                    address: this.address,
                    phone: this.phone,
                    mail: this.mail,
                    password: this.password,
                }

                signupUser(params)
                    .then((res) => {
                        if (!res.message) {
                            useUsers().setCurUser(res)
                            localStorage.setItem("dialogMes", "Successful creating user, logged in")
                            this.$router.push('/')
                        } else {
                            this.errorMessage = res.message
                        }

                    })
                    .catch((err) => {
                        this.errorMessage = err.message
                    })
            } else {
                this.errorMessage = "Passwords must be identical"
            }

        }
    },
    setup() {

        const mailRules = [
            (val: string) => val && val.length > 0 || 'Email can not be empty',
            (val: string) => (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)) || "It's not email",
        ]

        const phoneRules = [
            (val: string) => val && val.length > 0 || 'Email can not be empty',
            (val: string) => (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(val)) || "It's not phone",
        ]

        const passwordRules = [ (val: string) => val && val.length > 5 || 'Need more than 5 symbols']
        const nameRules = [ (val: string) => val && val.length > 1 || 'Need more than 1 symbols']
        const addressRules = [ (val: string) => val && val.length > 5 || 'Need more than 5 symbols']


        return {
            mailRules, phoneRules, passwordRules, nameRules, addressRules
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
