import { QueueModel } from './QueueModel';

describe('QueueModel', () => {
  describe('setParams()', () => {
    test('sets queueing simulation parameters', () => {
      const model = new QueueModel();
      model.setParams({
        interArrivalTime: () => 999999,
        processingTime: () => 99999,
        maxQueueLength: 1023,
      });
      expect(model.params.interArrivalTime()).toEqual(999999);
      expect(model.params.processingTime()).toEqual(99999);
      expect(model.params.maxQueueLength).toEqual(1023);
    });
  });

  describe('handleArrival()', () => {

    test('immediately kicks off processing when possible', () => {
      const model = new QueueModel();
      const job = {
        arrivalTime: 9,
        procStartTime: 0,
        procDuration: 14,
      }
      model.handleArrival(job);
      expect(model.jobsInFlight).toEqual(1);
      expect(job.procStartTime).toEqual(9);
    });

    test('queues job when processor unavailable', () => {
      const model = new QueueModel();
      model.setParams({
        maxQueueLength: 1,
        numProcessors: 1,
      });
      const job0 = {
        arrivalTime: 5,
        procStartTime: 0,
        procDuration: 10,
      }
      const job1 = {
        arrivalTime: 13,
        procStartTime: 0,
        procDuration: 6,
      }
      model.handleArrival(job0);
      model.handleArrival(job1);

      expect(model.jobsInFlight).toEqual(1);
      expect(model.queue.length).toEqual(1);
    });

    test('balks when queue full', () => {
      const model = new QueueModel();
      model.setParams({
        maxQueueLength: 1,
        numProcessors: 1,
      });
      const job0 = {
        arrivalTime: 5,
        procStartTime: 0,
        procDuration: 999,
      }
      const job1 = {
        arrivalTime: 10,
        procStartTime: 0,
        procDuration: 999,
      }
      const job2 = {
        arrivalTime: 15,
        procStartTime: 0,
        procDuration: 999,
      }
      model.handleArrival(job0);
      model.handleArrival(job1);
      model.handleArrival(job2);

      expect(model.jobsInFlight).toEqual(1);
      expect(model.queue.length).toEqual(1);
      expect(model.balks).toEqual(1);
    });

  });

  describe('runBatch()', () => {
    test('runs a batch of queue events', () => {
      const model = new QueueModel();
      model.setParams({
        // 1e6 micros between arrivals
        interArrivalTime: () => 1000000,
        // 1e5 micros between start of processing and finish
        processingTime: () => 100000,
      });

      // Run for (1e7 - 1) micros
      const rslt = model.runBatch(10000000-1);
    });
  });

});
