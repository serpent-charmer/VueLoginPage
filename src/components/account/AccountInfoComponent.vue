<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import AccountCredentials from '../../common/account/AccountCredentials';
import AccountType from '../../common/account/AccountType';

const emit = defineEmits(['updateAccount', 'removeAccount']);
const props = defineProps({
    account: {
        type: AccountCredentials,
        required: true
    }
});
let account = props.account;
let isLdap = computed(() => account.type == AccountType.Ldap);
const updateAccount = (uid: String, obj: any) => {
    emit('updateAccount', {uid, obj});
}
const removeAccount = (uid: String) => {
    console.log(uid);
    emit('removeAccount', {uid});
};
</script>

<template>
    <div :class="['account-row', isLdap ? 'account-ldap' : '']">
        <sl-input :placeholder="account.tags" @blur="updateAccount(account.uid, {tags: $event.target.value})"></sl-input>
        <sl-select :value="account.type" @sl-change="updateAccount(account.uid, {type: $event.target.value})">
            <sl-option value="local">Локальная</sl-option>
            <sl-option value="ldap">LDAP</sl-option>
        </sl-select>
        <sl-input :value="account.login" @blur="updateAccount(account.uid, {login: $event.target.value})"></sl-input>
        <sl-input v-if="!isLdap" :value="account.password" type="password" password-toggle @blur="updateAccount(account.uid, {password: $event.target.value})"></sl-input>
        <sl-icon-button name="trash-fill" @click="removeAccount(account.uid)"></sl-icon-button>
    </div>

</template>

<style lang="scss" scoped>
    .account-ldap {
        grid-template-columns: 1fr 1fr 2fr 1fr;
    }
</style>