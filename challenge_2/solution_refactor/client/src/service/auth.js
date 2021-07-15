export default class AuthService {
  constructor(http) {
    this.http = http;
  }

  async login(username, password) {
    return this.http.fetch(`/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  }

  async me() {
    return {
      username: "ellie",
      token: "abc1234",
    };
  }

  async logout() {
    return;
  }

  async signup(username, password, name, email, url) {
    return this.http.fetch(`/signup`, {
      method: "POST",
      body: JSON.stringify({ username, password, name, email, url }),
    });
  }
}
