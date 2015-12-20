import moment from 'moment'
import {customElement, bindable} from 'aurelia-framework'

@customElement('since-date')
@bindable('date')

export class SinceDate {
  constructor() {
  }

  bind() {
    this.date = moment(this.date).format("MMMM YYYY")
  }
}
