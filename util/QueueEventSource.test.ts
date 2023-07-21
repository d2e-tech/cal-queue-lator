import { QueueEventSource } from './QueueEventSource';

describe('QueueEventSource', () => {
  describe('addArival()', () => {

    test('adds an arrival event', () => {
      const source = new QueueEventSource();
      source.addArrival({
        arrivalTime: 4,
        procDuration: 128,
      })
      const next = source.next()
      expect(next.value.eventType).toBe('arrive');
      expect(next.value.job).toEqual({
        arrivalTime: 4,
        procDuration: 128,
      });
      expect(next.done).toBe(false);
    });

  })
});
