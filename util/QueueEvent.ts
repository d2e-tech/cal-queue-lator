export class QueueEvent {
  eventType: 'arrive' | 'finish' = 'arrive';
  job: QueueJob = {
    arrivalTime: 0,
    procDuration: 0,
  };
}
