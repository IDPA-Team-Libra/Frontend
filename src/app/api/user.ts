export class User {
    username: string;
    password: string;
    email: string;
    access_token: string;

    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

}



