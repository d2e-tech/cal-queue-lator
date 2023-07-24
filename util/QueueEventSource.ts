import { QueueEvent } from './QueueEvent';
import { QueueEventLedger } from './QueueEventLedger';

export class QueueEventSource {
  ledger: QueueEventLedger;

  constructor() {
    this.ledger = new QueueEventLedger();
  }

  addArrival(job: QueueJob) {
    this.ledger.add(new QueueEvent(
      'arrive',
      job,
    ));
  }

  next() {
    return {
      value: this.ledger.shift(),
      done: false,
    };
  }
}
