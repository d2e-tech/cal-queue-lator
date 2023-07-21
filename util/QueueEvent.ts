export class QueueEvent {
  eventType: 'arrive' | 'finish' = 'arrive';
  job: QueueJob = {
    arrivalTime: 0,
    procDuration: 0,
  };

  constructor(eventType: 'arrive' | 'finish', job: QueueJob) {
    this.eventType = eventType;
    this.job = job;
  }
}
