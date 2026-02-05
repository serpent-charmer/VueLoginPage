import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AccountCredentials from '@/common/account/AccountCredentials'

export const useAccountStore = defineStore('accounts', {
  state: () => {
    const accounts = ref<AccountCredentials[]>([]);
    const getIdx = (uid: string) => computed(() => {
      return accounts.value.findIndex(v => v.uid === uid);
    });
    const find = (uid: string) => {
      return accounts.value.find(v => v.uid === uid);
    };
    const add = (account: AccountCredentials) => {
      accounts.value.push(account);
    };
    const update = (uid: string, newAccount: Partial<AccountCredentials>) => {
      const other = find(uid);
      if(other) {
        Object.assign(other, newAccount);
      }
    };
    const remove = (uid: String) => {
      accounts.value = accounts.value.filter(v => v.uid !== uid);
    };
    const clear = () => {
      accounts.value = [];
    };
    return { accounts, find, add, update, remove, clear }
  },
  persist: true,
})
