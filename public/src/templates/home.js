import {inject, ObserverLocator} from 'aurelia-framework'
import {HttpClient, json} from 'aurelia-fetch-client'

import 'fetch'

@inject(HttpClient, ObserverLocator)
export class Users {
  heading = 'Welcome'
  content = ''

  constructor(http, observerLocator) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http

    let subscription = observerLocator
      .getObserver(this, 'content')
      .subscribe(() => {
        this.contentUpdate()
      })
  }

  activate() {

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
