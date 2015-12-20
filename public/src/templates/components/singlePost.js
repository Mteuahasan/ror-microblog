import {customElement, bindable, ObserverLocator, inject} from 'aurelia-framework'

@inject(ObserverLocator)
@customElement('single-post')
@bindable('post')

export class SinglePost {
  postData = null
  user = null
  constructor(observerLocator) {
    // let subscription = observerLocator
    //   .getObserver(this, 'post')
    //   .subscribe(() => {
    //     this.bind()
    //   })
  }

  bind() {
    this.postData = this.post
    this.user = this.post.user
  }
}
