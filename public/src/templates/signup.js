import {inject} from 'aurelia-framework'
import {AuthService} from 'aurelia-auth'

const rand = () => Math.floor(Math.random()*1000)
@inject(AuthService)

export class Signup {
  heading = 'Sign Up'

  user = {
    pseudo: '',
    email: ``,
    first_name: '',
    last_name: '',
    password: ''
  }

  signupError = ''

  constructor(auth) {
    this.auth = auth
  }

  signup() {
    return this.auth.signup(this.user)
    .then(response => {
      console.log("Signed Up!")
    })
    .catch(error => {
      this.signupError = error.response
    })
  }
}
