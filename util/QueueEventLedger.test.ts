import { QueueEvent } from './QueueEvent';
import { QueueEventLedger } from './QueueEventLedger';

describe('QueueEventLedger', () => {
  describe('add()', () => {

    test('adds an event', () => {
      const ledger = new QueueEventLedger();
      const exp = new QueueEvent(
        'arrive',
        {
          arrivalTime: 4,
          procDuration: 128,
        },
      );
      ledger.add(exp);

      const got = ledger.shift();
      expect(got).toEqual(exp);
    });

    
    test('adds multiple events in the correct order', () => {
    });

  })
});
