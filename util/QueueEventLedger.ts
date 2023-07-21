import { QueueEvent } from './QueueEvent';

export class QueueEventLedger {
  ordered: QueueEvent[];

  constructor() {
    this.ordered = [];
  }

  add(qev: QueueEvent) {
    this.ordered.push(qev);
  }

  shift(): QueueEvent {
    let rv: QueueEvent | undefined = this.ordered.shift();
    if (typeof rv === 'undefined') {
      throw 'tried to shift off empty QueueEventLedger';
    }
    return rv;
  }
}
