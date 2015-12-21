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

    })
    .catch(error => {
      console.log(JSON.parse(error.response))
      this.signupError = JSON.parse(error.response)
    })
  }
}
