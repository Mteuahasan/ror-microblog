import {bindable} from 'aurelia-framework'
import {inject} from 'aurelia-framework'
import {AuthService} from 'aurelia-auth'

@inject(AuthService)

export class NavBar {
  @bindable router = null

  pseudo = ''

  constructor(auth) {
    this.auth = auth
    if (auth.isAuthenticated())
      auth.getMe().then(response => this.pseudo = response.user.pseudo)
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated()
  }
}
