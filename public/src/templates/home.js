import {inject} from 'aurelia-framework'
import {HttpClient, json} from 'aurelia-fetch-client'
import {AuthService} from 'aurelia-auth'

import 'fetch'

@inject(HttpClient)
export class Users {
  heading = 'Welcome'
  content = ''

  constructor(http) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http
  }

  activate() {

  }

  submitPost() {
    this.http.fetch('/posts', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: json({
        content: this.content,
        mood_id: 1 // temporary
      })
    })
    .then(response => {
      this.content = ''
    })
  }
}
