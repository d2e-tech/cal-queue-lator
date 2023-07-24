interface QueueModelParams {
  interArrivalTime: () => number;
  processingTime: () => number;
  maxQueueLength: number;
}

export class QueueModel {
  params: QueueModelParams = {
    interArrivalTime: () => 1000000,
    processingTime: () => 100000,
    maxQueueLength: 1024,
  }

  setParams(params: QueueModelParams) {
    this.params = params;
  }
}
