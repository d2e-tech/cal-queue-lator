import { QueueEventLedger } from './QueueEventLedger';

export class QueueEventSource {
  ledger: QueueEventLedger;

  constructor() {
    this.ledger = new QueueEventLedger();
  }

  addArrival(job: QueueJob) {
    this.ledger.add({
      eventType: 'arrive',
      job: job,
    });
  }

  next() {
    return {
      value: this.ledger.shift(),
      done: false,
    };
  }
}
