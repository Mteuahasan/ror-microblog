import moment from 'moment'
import {inject} from 'aurelia-framework'
import {AuthService} from 'aurelia-auth'
import {HttpClient} from 'aurelia-fetch-client'

@inject(HttpClient, AuthService)

export class Account {
  user = {}
  me = {}
  isMe = false

  constructor(http, auth) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http
    this.auth = auth
  }

  activate(params, routeConfig, navigationInstruction) {
    if (this.auth.isAuthenticated()) {
      this.auth.getMe().then(response => {
        this.me = response.user
        if (params.pseudo === this.me.pseudo) {
          this.isMe = true
          this.user = this.me
        } else {
          this.isMe = false
          this.http.fetch(`/users/${params.pseudo}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
          })
          .then(response => response.json())
          .then(data => {
            this.user = data
          })
        }
      })
    }
  }
}
