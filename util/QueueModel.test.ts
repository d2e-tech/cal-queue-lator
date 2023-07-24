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
});
