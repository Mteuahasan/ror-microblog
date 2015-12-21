import {customElement, bindable, inject} from 'aurelia-framework'
import {HttpClient} from 'aurelia-fetch-client'

@inject(HttpClient)
@customElement('single-post')
@bindable('post')
@bindable('me')

export class SinglePost {
  postData = null
  user = null
  isAlreadyLiked = false
  isAlreadyReposted = false
  hidden = false

  constructor(http) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http
  }

  bind() {
    this.postData = this.post
    this.user = this.post.user

    this.post.likes.forEach(user => {
      if (this.me == user.id) {
        this.isAlreadyLiked = true
      }
    })
    this.post.reposters.forEach(user => {
      if (this.me == user.id) {
        this.isAlreadyReposted = true
      }
    })
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

  deletePost(id, i) {
    this.http.fetch(`/posts/${id}`, {
      method: 'delete',
    })
    .then(response => {
      this.hidden = true
    })
  }
}
