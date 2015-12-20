import moment from 'moment'
import {customElement, bindable, ObserverLocator, inject} from 'aurelia-framework'

@inject(ObserverLocator)
@customElement('since-date')
@bindable('date')

export class SinceDate {
  since = null
  constructor(observerLocator) {
    let subscription = observerLocator
      .getObserver(this, 'date')
      .subscribe(() => {
        this.bind()
      })
  }

  bind() {
    this.since = moment(this.date).format("MMMM YYYY")
  }

}
