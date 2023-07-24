export class QueueEvent {
  eventType: 'arrive' | 'finish' = 'arrive';
  job: QueueJob = {
    arrivalTime: 0,
    procStartTime: 0,
    procDuration: 0,
  };

  constructor(eventType: 'arrive' | 'finish', job: QueueJob) {
    this.eventType = eventType;
    this.job = job;
  }

  get occursAt() {
    if (this.eventType === 'finish') {
      return this.job.procStartTime + this.job.procDuration;
    }
    return this.job.arrivalTime;
  }
}
