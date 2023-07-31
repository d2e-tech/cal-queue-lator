import { QueueEvent } from './QueueEvent';
import { QueueEventLedger } from './QueueEventLedger';
import { QueueJob } from './QueueJob';

interface QueueModelParams {
  interArrivalTime?: () => number;
  processingTime?: () => number;
  maxQueueLength?: number;
  numProcessors?: number;
}

export class QueueModel {
  params = {
    interArrivalTime: () => 1000000,
    processingTime: () => 100000,
    maxQueueLength: 1024,
    numProcessors: 8,
  }

  ledger: QueueEventLedger = new QueueEventLedger();
  queue: QueueJob[] = [];
  jobsInFlight: number = 0;

  // stats
  balks: number = 0;

  setParams(params: QueueModelParams) {
    this.params = {...this.params, ...params};
  }

  initialArrival() {
    this.ledger.add(new QueueEvent('arrive', {
      arrivalTime: 0,
      procStartTime: 0,
      procDuration: this.params.processingTime(),
    }));
  }

  handleArrival(job: QueueJob) {
    if (this.jobsInFlight < this.params.numProcessors) {
      this.jobsInFlight++;
      job.procStartTime = job.arrivalTime;
      this.ledger.add(new QueueEvent('finish', job));
      return
    }

    if (this.queue.length >= this.params.maxQueueLength) {
      this.balks++;
      return;
    }

    this.queue.push(job);
  }

  scheduleNextArrival(prev: QueueJob) {
    this.ledger.add(new QueueEvent('arrive', {
      arrivalTime: prev.arrivalTime + this.params.interArrivalTime(),
      procStartTime: 0,
      procDuration: this.params.processingTime(),
    }));
  }

  runBatch(upTo: number) {
    if (this.ledger.ordered.length == 0) {
      this.initialArrival();
    }

    for (const qev of this.ledger.upTo(upTo)) {
      if (qev.eventType === 'arrive') {
        this.handleArrival(qev.job);
        this.scheduleNextArrival(qev.job)
      }
    }
  }
}
