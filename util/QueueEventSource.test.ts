const QueueEventSource = require('./QueueEventSource');

describe('QueueEventSource', () => {
  describe('addArival()', () => {

    test('adds an arrival event', () => {
      const source = new QueueEventSource();
      source.addArrival(12346);
      const next = source.next()
      expect(next.value.type).toBe('arrival');
      expect(next.value.time).toBe(12346);
      expect(next.done).toBe(false);
    });

  })
});
