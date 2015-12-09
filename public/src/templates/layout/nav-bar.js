import {bindable} from 'aurelia-framework'
import {inject} from 'aurelia-framework'
import {AuthService} from 'aurelia-auth'

@inject(AuthService)

export class NavBar {
  @bindable router = null

  username = ''

  constructor(auth) {
    this.auth = auth
    if (this.isAuthenticated) this.getUsername()
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated()
  }

  getUsername() {
    this.auth.getMe()
    .then(response =>
      this.username = response.user.pseudo
    )
    .catch(() => {})
  }
}
