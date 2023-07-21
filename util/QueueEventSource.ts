const QueueJob = require('./QueueJob');

interface QueueEvent {
  eventType: 'arrive' | 'finish';
  job: QueueJob;
}

class QueueEventSource {
  eventLedger: QueueEvent[];

  constructor() {
    this.eventLedger = [];
  }

  addArrival(job: QueueJob) {
    eventLedger.add({
      eventType: 'arrive',
      job: new QueueJob(4, 128),
    });
  }

  next() {
    return {value: {eventType: 'arrival', time: 12345}, done: false};
  }
}

module.exports = [
  QueueEventSource,
];
