import {inject} from 'aurelia-framework'
import {AuthService} from 'aurelia-auth'

@inject(AuthService)

export class Login {
  heading = 'Sign Up'

  user = {
    pseudo: '',
    password: ''
  }

  loginError = ''

  constructor(auth) {
    this.auth = auth
  }

  login() {
    return this.auth.login(this.user.pseudo, this.user.password)
    .then(response => {
      console.log("Login response: " + response)
    })
    .catch(error => {
      this.loginError = error.response
    })
  }
}
