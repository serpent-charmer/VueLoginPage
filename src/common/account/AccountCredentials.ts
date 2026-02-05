import AccountTag from "./AccountTag";
import type AccountType from "./AccountType";

class AccountCredentials {
    uid: String;
    tags: AccountTag[];
    tagsText: String;
    type: AccountType;
    login: String;
    password: String | null;

    constructor(uid: String, tags: String, type:AccountType, login: String, password: String | null) {
        this.uid = uid;
        if(tags) {
            this.tagsText = tags;
            this.tags = this.tagsText.split(";").map(v => new AccountTag(v));
        }
        this.type = type;
        this.login = login;
        this.password = password;
    }
}

export default AccountCredentials;