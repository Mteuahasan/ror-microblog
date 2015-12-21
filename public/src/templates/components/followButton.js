import {customElement, bindable, inject} from 'aurelia-framework'
import {HttpClient, json} from 'aurelia-fetch-client'

@customElement('follow-button')
@bindable('user1')
@bindable('user2')

@inject(HttpClient)

export class FollowButton {
  isFollowing = false

  constructor(http) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http
  }

  bind() {
    this.checkFollowing()
  }

  checkFollowing() {
    this.http.fetch(`/users/following/${this.user2}`, {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      this.isFollowing = data
    })
  }

  followUser() {
    this.http.fetch(`/users/${this.user2}/follow`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      this.isFollowing = true
    })

  }

  unfollowUser() {
    this.http.fetch(`/users/${this.user2}/unfollow`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      this.isFollowing = false
    })
  }
}
