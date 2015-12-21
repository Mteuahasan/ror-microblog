import {customElement, bindable, inject} from 'aurelia-framework'
import {AuthService} from 'aurelia-auth'
import {HttpClient} from 'aurelia-fetch-client'

@inject(HttpClient, AuthService)
@customElement('single-post')
@bindable('post')

export class SinglePost {
  postData = null
  user = null
  me = null
  isAlreadyLiked = false
  isAlreadyReposted = false

  constructor(http, auth) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http
    this.auth = auth
    this.auth.getMe().then(response => {
      this.me = response.user
      this.post.likes.forEach(user => {
        if (this.me.id == user.id) {
          console.log("YOO")
          this.isAlreadyLiked = true
        }
      })
      this.post.reposters.forEach(user => {
        if (this.me.id == user.id) {
          this.isAlreadyReposted = true
        }
      })
    })
  }

  bind() {
    this.postData = this.post
    this.user = this.post.user
    this.postData.likes.find(user => user.id)

  }


  likePost(id) {
    this.http.fetch(`/posts/${id}/like`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      this.postData.likes.push(this.me)
      this.isAlreadyLiked = true
    })
  }

  repostPost(id) {
    this.http.fetch(`/posts/${id}/repost`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      this.postData.reposters.push(this.me)
      this.isAlreadyReposted = true
    })
  }

  unLikePost(id) {
    this.http.fetch(`/posts/${id}/unlike`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      this.postData.likes.shift()
      this.isAlreadyLiked = false
    })
  }

  unRepostPost(id) {
    this.http.fetch(`/posts/${id}/unrepost`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      this.postData.reposters.shift()
      this.isAlreadyReposted = false
    })
  }
}
