import moment from 'moment'
import {inject} from 'aurelia-framework'
import {AuthService} from 'aurelia-auth'
import {HttpClient} from 'aurelia-fetch-client'

@inject(HttpClient, AuthService)

export class Account {
  user = {}
  me = {}
  isMe = false
  posts = []

  constructor(http, auth) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http
    this.auth = auth
  }

  activate(params, routeConfig, navigationInstruction) {
    this.auth.getMe().then(response => {
      this.me = response.user
      if (params.pseudo === this.me.pseudo) {
        this.isMe = true
        this.user = this.me
        this.getUserPosts()
      } else {
        this.isMe = false
        this.http.fetch(`/users/${params.pseudo}`,)
          .then(response => {
            if (response.status === 200) {
              return response.json()
            }
          })
          .then(data => {
            console.log(data)
            this.user = data.user
            this.getUserPosts()
          })
      }
    })
  }

  getUserPosts() {
    this.http.fetch(`/users/${this.user.id}/likes/`)
      .then(response => response.json())
      .then(data => {
        this.posts = data.map(post => post.post)
      })
  }
}
