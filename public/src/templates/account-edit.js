import moment from 'moment'
import {inject} from 'aurelia-framework'
import {Router} from 'aurelia-router'
import {HttpClient, json} from 'aurelia-fetch-client'
import {AuthService} from 'aurelia-auth'

@inject(HttpClient, AuthService, Router)

export class Account {
  me = {}

  constructor(http, auth, router) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http
    this.auth = auth
    this.router = router
  }

  activate() {
    this.auth.getMe().then(response => {
      this.me = response.user
    })
  }

  updateUser() {
    this.http.fetch(`/users/${this.me.id}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: json({
        first_name: this.me.first_name,
        last_name: this.me.last_name,
        img_url: this.me.img_url,
        description: this.me.description
      })
    })
    .then(response => {
      if (response.status === 204) {
        this.router.navigate(`account/${this.me.pseudo}`);
      }
    })
  }
}
