import moment from 'moment'
import {inject, ObserverLocator} from 'aurelia-framework'
import {HttpClient, json} from 'aurelia-fetch-client'
import {AuthService} from 'aurelia-auth'


import 'fetch'

@inject(HttpClient, AuthService, ObserverLocator)
export class Home {
  content = ''
  user = {}
  moods = []
  selectedMood = null

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
    })

    this.http.fetch('/moods')
      .then(response => response.json())
      .then(data => {
        this.moods = data.map(mood => mood.mood)
      })

    this.http.fetch('/posts')
      .then(response => {
        if (response.status === 200) {
          console.log(response.status)
          return response.json()
        }
      })
      .then(data => {
        console.log(data)
        if (data && data.user) {
          this.user = data.user
          this.getUserPosts()
        }
      })
  }

  contentUpdate() {
    let l = this.content.length
    if (l > 280) {
      this.content = this.content.slice(0, 280-l)
    }
  }

  selectMood(index) {
    this.selectedMood = this.moods[index]
  }

  submitPost() {
    if (this.selectedMood) {
      this.http.fetch('/posts', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: json({
          content: this.content,
          mood_id: this.selectedMood.id
        })
      })
      .then(response => {
        console.log(response)
        this.content = ''
        this.selectedMood = null
      })
    }
  }
}
