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

  constructor(http, auth) {
    http.configure(config => {
      config.withBaseUrl('/api/v1')
    })
    this.http = http
    this.auth = auth
    this.auth.getMe().then(response => {
      this.me = response.user
    })
  }

  bind() {
    console.log(this.post)
    this.postData = this.post
    this.user = this.post.user
  }

  likePost(id) {
    this.http.fetch(`/posts/${id}/like`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      this.postData.likes.push(this.me)
      console.log(response)
    })
  }

  repostPost(id) {

  }
}
