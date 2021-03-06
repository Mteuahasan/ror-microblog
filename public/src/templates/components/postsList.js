import {customElement, bindable, ObserverLocator, inject} from 'aurelia-framework'

@inject(ObserverLocator)
@customElement('posts-list')
@bindable('posts')
@bindable('current')

export class PostsList {
  allPosts = null

  constructor(observerLocator) {
    let postsSubscription = observerLocator
      .getObserver(this, 'posts')
      .subscribe(() => {
        this.bind()
      })
  }

  bind() {
    this.allPosts = this.posts
  }
}
