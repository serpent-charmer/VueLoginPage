<script setup lang="ts">
import { computed } from 'vue';
import AccountType from '../../common/account/AccountType';

import AccountCredentials from '@/common/account/AccountCredentials';

const emit = defineEmits(['updateAccount', 'removeAccount']);
const props = defineProps({
    account: {
        type: AccountCredentials,
        required: true
    },
    errors: {
        type: Map<String, String[]>,
        required: true
    }
});
const account = props.account;
const isLdap = computed(() => props.account.type == AccountType.Ldap);
const errors = computed(() => props.errors.get(props.account.uid));

const updateAccount = (uid: String, obj: any) => {
    emit('updateAccount', { uid, obj });
}
const removeAccount = (uid: String) => {
    emit('removeAccount', { uid });
};
</script>

<template>
    <div :class="['account-row', isLdap ? 'account-ldap' : '']">
        <sl-input :class="{ 'field-error': errors?.includes('tags') }" :value="account.tagsText"
            @blur="updateAccount(account.uid, { tagsText: $event.target.value })"></sl-input>
        <sl-select :value="account.type" @sl-change="updateAccount(account.uid, { type: $event.target.value })">
            <sl-option value="local">Локальная</sl-option>
            <sl-option value="ldap">LDAP</sl-option>
        </sl-select>
        <sl-input :class="{ 'field-error': errors?.includes('login') }" :value="account.login"
            @blur="updateAccount(account.uid, { login: $event.target.value })"></sl-input>
        <sl-input v-if="!isLdap" :class="{ 'field-error': errors?.includes('password') }" :value="account.password"
            type="password" password-toggle
            @blur="updateAccount(account.uid, { password: $event.target.value })"></sl-input>
        <sl-icon-button name="trash-fill" @click="removeAccount(account.uid)"></sl-icon-button>
    </div>

</template>

<style lang="scss" scoped>
.account-row {
    display: grid;
    grid-template-columns: repeat(5, minmax(50px, 1fr));
    align-items: center;
}

.account-ldap {
    grid-template-columns: 1fr 1fr 2fr 1fr;
}

.field-error {
    --sl-input-background-color: #ffcccc;
}
</style>