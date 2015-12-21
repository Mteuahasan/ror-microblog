import {ObserverLocator, inject} from 'aurelia-framework'
import {HttpClient, json} from 'aurelia-fetch-client'
import {AuthService} from 'aurelia-auth'


@inject(HttpClient, ObserverLocator, AuthService)

export class Search {
  search = ''
  posts = []
  me = null

  constructor(http, observerLocator, auth) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http
    this.auth = auth

    let subscription = observerLocator
      .getObserver(this, 'search')
      .subscribe(() => {
        this.research()
      })
  }

  activate() {
    this.auth.getMe().then(response => {
      this.me = response.user
    })
  }

  research() {
    if (this.search.length > 2) {
      this.http.fetch(`/search?content=${this.search}`)
      .then(response => response.json())
      .then(data => {
        this.posts = data.map(post => post.post)
        console.log(this.posts)
      })
    }
  }

}
