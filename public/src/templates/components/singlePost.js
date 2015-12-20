import {customElement, bindable, inject} from 'aurelia-framework'
import {AuthService} from 'aurelia-auth'


@inject(AuthService)
@customElement('single-post')
@bindable('post')

export class SinglePost {
  postData = null
  user = null
  me = null

  constructor(auth) {
    this.auth = auth
  }

  activate() {
    this.auth.getMe().then(response => {
      this.me = response.user
    })
  }

  bind() {
    this.postData = this.post
    this.user = this.post.user
  }
}
