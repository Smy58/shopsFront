<template>
    <div class="account-page">
        <h4 class="text-h4 account-page__title">Settings</h4>

        <div class="account-page__content">
            <q-form
                @submit="onChangeInfo"
                class="account-form q-pa-md"
            >
                <h5 class="text-h5">Change info</h5>
                <q-input
                    filled
                    v-model="name"
                    label="Your name *"
                    hint="Name and surname"
                    lazy-rules
                    :rules="nameRules"
                />
                <q-input
                    filled
                    v-model="address"
                    label="Your address *"
                    hint="Address"
                    lazy-rules
                    :rules="addressRules"
                />
                <q-input
                    filled
                    v-model="phone"
                    type="tel"
                    label="Your phone *"
                    hint="Phone number"
                    lazy-rules
                    :rules="phoneRules"
                />
                <q-input
                    filled
                    v-model="mail"
                    label="Your mail"
                    hint="Web mail"
                    lazy-rules
                    :rules="mailRules"
                />

                <div class="account-form__btns">
                    <q-btn label="Submit Changes" type="submit" :disable="isLoading" color="primary"/>

                </div>
            </q-form>

            <q-form
                @submit="onChangePassword"
                class="account-form q-pa-md"
            >
                <h5 class="text-h5">Change Password</h5>

                <q-input
                    filled
                    v-model="oldPassword"
                    type="password"
                    label="Old password *"
                    class="form__input"
                    lazy-rules
                    :rules="passwordRules"
                />

                <q-input
                    filled
                    v-model="newPassword"
                    type="password"
                    label="New password *"
                    class="form__input"
                    lazy-rules
                    :rules="passwordRules"
                />

                <q-input
                    filled
                    v-model="newPasswordRep"
                    type="password"
                    label="Repeat new password *"
                    class="form__input"
                    lazy-rules
                    :rules="passwordRules"
                />

                <div class="account-form__btns">
                    <q-btn label="Change" type="submit" :disable="isLoading" color="primary"/>
                    <p class="account-form__error" v-if="errorMessage">{{ errorMessage }}</p>

                </div>
            </q-form>
        </div>
        <q-dialog v-model="dialog" backdrop-filter="blur(4px)">
            <q-card style="width: 320px">
                <q-card-section class="row items-center q-pb-none text-h6">
                    Updated
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Close" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { updateUserInfo, updateUserPassword } from 'src/api/user';
import { useUsers } from 'src/stores/user';
import { updateUserParams, updateUserPasswordParams } from 'src/types/user';
import { defineComponent } from 'vue'

const accMock = {
    "id": 1,
    "name": "Kostya",
    "address": "Dostyk 111",
    "phone": "+7 777 666 55 44",
    "mail": ''
}

export default defineComponent({
    data() {
        return {
            name: '',
            address: '',
            phone: '',
            mail: '',
            oldPassword: '',
            newPassword: '',
            newPasswordRep: '',
            userId: 0,
            dialog: false,
            dialogMes: '',
            isLoading: false,
            errorMessage: ''
        }
    },
    beforeMount() {
        const user = useUsers().getCurUser
        if (user) {
            this.userId = user.id
            this.name = user.name
            this.address = user.address
            this.phone = user.phone
            this.mail = user.mail
        }
    },
    methods: {
        onChangeInfo() {
            this.isLoading = true
            const params: updateUserParams = {
                name: this.name,
                address: this.address,
                phone: this.phone,
                mail: this.mail,
            }
            updateUserInfo(params, this.userId)
                .then((res) => {

                    this.isLoading = false
                    this.dialog = true
                    if(!res.message) {
                        useUsers().setCurUser(res)
                        this.dialogMes = 'Updated!'
                    } else {
                        this.dialogMes = res.message
                    }
                })
                .catch((err) => {
                    this.isLoading = false
                    this.dialog = true
                    this.dialogMes = "Error, try again later"
                })
        },
        onChangePassword() {
            if (this.newPassword === this.newPasswordRep) {
                this.isLoading = true
                const params: updateUserPasswordParams = {
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                }
                updateUserPassword(params, this.userId)
                    .then((res) => {

                        this.isLoading = false
                        this.dialog = true
                        if(!res.message) {
                            this.dialogMes = 'Updated!'
                            this.errorMessage = ''
                        } else {
                            this.dialogMes = res.message
                            this.errorMessage = ''

                        }
                    })
                    .catch((err) => {
                        this.isLoading = false
                        this.dialog = true
                        this.dialogMes = "Error, try again later"
                        this.errorMessage = ''
                    })
            } else {
                this.errorMessage = 'Passwords must be identical'
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

    &__error {
        color: #C10015;
        font-weight: bolder;
        margin-top: 5px;
    }
}
</style>
