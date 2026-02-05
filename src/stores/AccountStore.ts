import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AccountCredentials  from '@/common/account/AccountCredentials'


export const useAccountStore = defineStore('accounts', {
  state: () => {
    const db = ref<AccountCredentials[]>([]);
    const accounts = ref<AccountCredentials[]>([]);
    const errors = ref<Map<String, AccountCredentials>>();
    const populate = () => {
      accounts.value = [...db.value];
    }
    const add = (account: AccountCredentials) => {
      accounts.value.push(account);
    };
    const update = (uid: String, newAccount: Partial<AccountCredentials>) => {
      const other = accounts.value.find(v => v.uid === uid);
      if(other) {
        // const field = validateFields(newAccount);
        // if(field) {
        //   other.login = "ОШИБКА ВВОДА";
        // } else {
        Object.assign(other, newAccount);
        //   if(other.type == AccountType.Ldap)
        //     other.password = null;
        save(other);
        // }
      }
    };
    const remove = (uid: String) => {
      let old = db.value;
      db.value = db.value.filter(v => v.uid !== uid);
      if(old != db.value) {
        accounts.value = [...db.value];
      }
    };
    const clear = () => {
      accounts.value = [];
    };

    const validateFields = (account: Partial<AccountCredentials>) => {
      if(account) {
        if(account.tags && account.tags?.length > 50) {
          return "tags";
        }
        if(!account.login || account.login.length > 100) {
          return "login";
        }
        if(!account.password || account.password.length > 100) {
          return "password";
        }
        return null;
      }
    }

    const save = (account: AccountCredentials) => { 
      if(account) {
        let copy = db.value.find(v => v.uid == account.uid);
        if(copy)
          Object.assign(copy, account);
        else
          db.value.push(account);
      }
      console.log(account, db.value);
    };
    return { accounts, db, populate, add, update, remove, clear }
  },
  persist: {
    pick: ['db'],
  },
})
