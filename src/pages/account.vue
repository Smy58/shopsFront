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
import { updateUserInfo, updateUserPassword } from 'boot/user';
import { useUsers } from 'src/stores/user';
import { updateUserParams, updateUserPasswordParams } from 'src/types/user';
import { defineComponent, onBeforeMount, ref } from 'vue'

export default defineComponent({
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

        const name = ref('');
        const address = ref('');
        const phone = ref('');
        const mail = ref('');
        const oldPassword = ref('');
        const newPassword = ref('');
        const newPasswordRep = ref('');
        const userId = ref(0);
        const dialog = ref(false);
        const dialogMes = ref('');
        const isLoading = ref(false);
        const errorMessage = ref('');

        function onChangeInfo() {
            isLoading.value = true
            const params: updateUserParams = {
                name: name.value,
                address: address.value,
                phone: phone.value,
                mail: mail.value,
            }
            updateUserInfo(params, userId.value)
                .then((res) => {

                    isLoading.value = false
                    dialog.value = true
                    if(!res.message) {
                        useUsers().setCurUser(res)
                        dialogMes.value = 'Updated!'
                    } else {
                        dialogMes.value = res.message
                    }
                })
                .catch((err) => {
                    isLoading.value = false
                    dialog.value = true
                    dialogMes.value = "Error, try again later"
                })
        };
        function onChangePassword() {
            if (newPassword.value === newPasswordRep.value) {
                isLoading.value = true
                const params: updateUserPasswordParams = {
                    oldPassword: oldPassword.value,
                    newPassword: newPassword.value,
                }
                updateUserPassword(params, userId.value)
                    .then((res) => {

                        isLoading.value = false
                        dialog.value = true
                        if(!res.message) {
                            dialogMes.value = 'Updated!'
                            errorMessage.value = ''
                        } else {
                            dialogMes.value = res.message
                            errorMessage.value = ''

                        }
                    })
                    .catch((err) => {
                        isLoading.value = false
                        dialog.value = true
                        dialogMes.value = "Error, try again later"
                        errorMessage.value = ''
                    })
            } else {
                errorMessage.value = 'Passwords must be identical'
            }

        }

        onBeforeMount(() => {
            const user = useUsers().getCurUser
            if (user) {
                userId.value = user.id
                name.value = user.name
                address.value = user.address
                phone.value = user.phone
                mail.value = user.mail
            }
        })

        return {
            mailRules, phoneRules, passwordRules, nameRules, addressRules,
            name,
            address,
            phone,
            mail,
            oldPassword,
            newPassword,
            newPasswordRep,
            userId,
            dialog,
            dialogMes,
            isLoading,
            errorMessage,
            onChangeInfo,
            onChangePassword,
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
