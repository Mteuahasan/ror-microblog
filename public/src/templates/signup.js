import {inject} from 'aurelia-framework'
import {AuthService} from 'aurelia-auth'

const rand = () => Math.floor(Math.random()*1000)
@inject(AuthService)

export class Signup {
  heading = 'Sign Up'

  user = {
    pseudo: '',
    email: '',
    first_name: '',
    last_name: '',
    password: ''
  }

  signupError = ''

  constructor(auth) {
    this.auth = auth
  }

  signup() {
    this.auth.signup(this.user)
    .then(function() {
      login()
    })
    .catch(error => {
      console.error(error)
      this.signupError = error.response
    })
  }

  login() {
    console.log("LOGGING")
    return this.auth.login(this.user.pseudo, this.user.password)
    .then(response => {
      console.log("Login response: " + response)
    })
    .catch(error => {
      this.loginError = error.response
    })
  }
}
