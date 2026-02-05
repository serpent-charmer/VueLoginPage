import type AccountType from "./AccountType";

class AccountCredentials {
    uid: String;
    tags: String[];
    type: AccountType;
    login: String;
    password: String | null;

    constructor(uid: String, tags: String[], type:AccountType, login: String, password: String | null) {
        this.uid = uid;
        this.tags = tags;
        this.type = type;
        this.login = login;
        this.password = password;
    }
}

function withUid(tags: String[], type:AccountType, login: String, password: String | null) {
    return new AccountCredentials(crypto.randomUUID(), tags, type, login, password);
}

function copy(account: AccountCredentials) {
    return new AccountCredentials(account.uid, account.tags, account.type, account.login, account.password);
}


export default AccountCredentials;