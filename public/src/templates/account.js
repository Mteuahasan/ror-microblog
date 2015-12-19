import moment from 'moment'
import {inject} from 'aurelia-framework'
import {AuthService} from 'aurelia-auth'

@inject(AuthService)

export class Welcome {
  user = {}

  constructor(auth) {
    this.auth = auth
  }

  activate(auth) {
    this.auth.getMe().then(response => {
      this.user = response.user
      this.user.since = moment(this.user.created_at).format("MMMM YYYY")
      console.log(this.user)
    })
  }
}
