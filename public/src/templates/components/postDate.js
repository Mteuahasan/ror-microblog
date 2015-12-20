import moment from 'moment'
import {customElement, bindable, ObserverLocator, inject} from 'aurelia-framework'

@inject(ObserverLocator)
@customElement('post-date')
@bindable('date')

export class PostDate {
  formattedDate = null
  constructor(observerLocator) {
    let subscription = observerLocator
      .getObserver(this, 'date')
      .subscribe(() => {
        this.bind()
      })
  }

  bind() {
    this.formattedDate = moment(this.date).format('MMM Do YYYY, hh:mm'); //
  }
}
