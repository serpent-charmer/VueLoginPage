import type AccountType from "./AccountType";

class AccountCredentials {
    uid: String;
    tags: String[];
    type: AccountType;
    login: String;
    password: String | null;

    constructor(tags: String[], type:AccountType, login: String, password: String | null) {
        this.uid = crypto.randomUUID();
        this.tags = tags;
        this.type = type;
        this.login = login;
        this.password = password;
    }
}

export default AccountCredentials;