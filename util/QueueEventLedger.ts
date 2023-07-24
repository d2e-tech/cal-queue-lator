import { QueueEvent } from './QueueEvent';

export class QueueEventLedger {
  ordered: QueueEvent[];

  constructor() {
    this.ordered = [];
  }

  add(qev: QueueEvent) {
    const t = qev.occursAt;
    const i = this.ordered.findIndex((qev2) => (qev2.occursAt > t));

    if (i === -1) {
      this.ordered.push(qev);
      return;
    }
    if (i === 0) {
      this.ordered.unshift(qev);
      return;
    }

    this.ordered = this.ordered.splice(i, 0, qev);
  }

  shift(): QueueEvent {
    let rv: QueueEvent | undefined = this.ordered.shift();
    if (typeof rv === 'undefined') {
      throw 'tried to shift off empty QueueEventLedger';
    }
    return rv;
  }
}
