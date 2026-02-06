<script setup lang="ts">
import AccountInfo from '@/components/account/AccountInfoComponent.vue';
import AccountType from '@/common/account/AccountType';
import AccountCredentials from '@/common/account/AccountCredentials';

import { useAccountStore } from '@/stores/AccountStore';

const accountStore = useAccountStore();
accountStore.copyFromDb();

const addAccount = () => {
  let account = new AccountCredentials(crypto.randomUUID(), "", AccountType.Local, "", null);
  accountStore.add(account);
};

const updateAccount = (payload: any) => {
  let { uid, obj } = payload;
  accountStore.update(uid, obj);
}

const removeAccount = (payload: any) => {
  let { uid } = payload;
  accountStore.remove(uid);
}


</script>

<template>
  <div>

    <div class="login-page">
      <div class="header">

        <span style="font-size: 2.5rem">Учетные записи</span>
        <sl-icon-button name="plus-lg" label="Edit" style="font-size: 2.5rem;" @click="addAccount"></sl-icon-button>

      </div>

      <sl-alert open>
        <sl-icon slot="icon" name="info-circle"></sl-icon>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </sl-alert>


      <div>
        <div class="account-row">
          <span>Метки</span>
          <span>Тип записи</span>
          <span>Логин</span>
          <span>Пароль</span>
        </div>
        <AccountInfo v-for="(account) in accountStore.accounts" :account="account" :errors="accountStore.errors" :key="account.uid"
          @update-account="updateAccount" @remove-account="removeAccount" />
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '@fontsource/ibm-plex-mono/500.css';
@import '@fontsource/ibm-plex-mono/600.css';
@import '@fontsource/ibm-plex-mono/700.css';

.login-page {
  font-family: 'IBM Plex Mono';
}

.header {
  display: flex;
}

.account-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(50px, 1fr));
  align-items: center;
}

.account-row>* {
  margin-right: 1rem;
  margin-bottom: .5rem;
}
</style>
