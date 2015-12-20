import moment from 'moment'
import {inject, ObserverLocator} from 'aurelia-framework'
import {HttpClient, json} from 'aurelia-fetch-client'
import {AuthService} from 'aurelia-auth'


import 'fetch'

@inject(HttpClient, AuthService, ObserverLocator)
export class Home {
  content = ''
  user = {}

  constructor(http, auth, observerLocator) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http
    this.auth = auth

    let subscription = observerLocator
      .getObserver(this, 'content')
      .subscribe(() => {
        this.contentUpdate()
      })
  }

  activate() {
    this.auth.getMe().then(response => {
      this.user = response.user
      this.user.since = moment(this.user.created_at).format("MMMM YYYY")
    })
  }

  contentUpdate() {
    let l = this.content.length
    if (l > 280) {
      this.content = this.content.slice(0, 280-l)
    }
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
      console.log(response)
      this.content = ''
    })
  }
}
