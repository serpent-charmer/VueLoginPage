import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AccountCredentials from '@/common/account/AccountCredentials'
import AccountType from '@/common/account/AccountType';
import AccountTag from '@/common/account/AccountTag';


export const useAccountStore = defineStore('accounts', {
  state: () => {
    const db = ref<AccountCredentials[]>([]);
    const accounts = ref<AccountCredentials[]>([]);
    const errors = ref<Map<String, String[]>>(new Map<String, String[]>());

    const copyFromDb = () => {
      accounts.value = db.value.map(v => new AccountCredentials(v.uid, v.tagsText, v.type, v.login, v.password));
    }
    const add = (account: AccountCredentials) => {
      accounts.value.push(account);
    };
    const update = (uid: String, newAccount: Partial<AccountCredentials>) => {
      const other = accounts.value.find(v => v.uid === uid);
      if (other) {
        Object.assign(other, newAccount);
        const errs: String[] = validateFields(other);
        if (errs.length > 0) {
          errors.value.set(other.uid, errs);
        } else {
          errors.value.delete(other.uid);
          save(other);
        }
      }
    };
    const remove = (uid: String) => {
      let old = db.value;
      db.value = db.value.filter(v => v.uid !== uid);
      if (old != db.value) {
        copyFromDb();
      }
    };
    const clear = () => {
      accounts.value = [];
    };

    const validateFields = (account: Partial<AccountCredentials>): String[] => {
      let errors: String[] = [];
      if (account) {
        if (account.tagsText && account.tagsText.length > 50) {
          errors.push("tags");
        }
        if (!account.login || account.login && account.login.length > 100) {
          errors.push("login");
        }
        if (account.type === AccountType.Local) {
          if (account.password) {
            if (account.password.length > 100)
              errors.push("password");
          } else {
            errors.push("password");
          }
        }
      }
      return errors;
    }

    const save = (account: AccountCredentials) => {
      if (account) {
        if (account.tagsText)
          account.tags = account.tagsText.split(";").filter(v => v.length).map(v => new AccountTag(v));
        if (account.type == AccountType.Ldap)
          account.password = null;
        let copy = db.value.find(v => v.uid == account.uid);
        if (copy)
          Object.assign(copy, account);
        else
          db.value.push(account);
      }
    };
    return { accounts, db, errors, copyFromDb, add, update, remove, clear }
  },
  persist: {
    pick: ['db'],
  },
})
