import {customElement, bindable, ObserverLocator, inject} from 'aurelia-framework'

@inject(ObserverLocator)
@customElement('posts-list')
@bindable('posts')

export class PostsList {
  allPosts = null
  constructor(observerLocator) {
    let subscription = observerLocator
      .getObserver(this, 'posts')
      .subscribe(() => {
        this.bind()
      })
  }

  bind() {
    console.log(this.posts)
    this.allPosts = this.posts
  }
}
