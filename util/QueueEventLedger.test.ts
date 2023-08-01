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
          procStartTime: 0,
          procDuration: 128,
        },
      );
      ledger.add(exp);

      const got = ledger.shift();
      expect(got).toEqual(exp);
    });

    
    test('adds multiple events in the correct order', () => {
      const ledger = new QueueEventLedger();
      const firstQev = new QueueEvent(
        'arrive',
        {
          arrivalTime: 4,
          procStartTime: 0,
          procDuration: 128,
        }
      );
      const secondQev = new QueueEvent(
        'arrive',
        {
          arrivalTime: 8,
          procStartTime: 0,
          procDuration: 256,
        }
      );

      ledger.add(secondQev);
      ledger.add(firstQev);

      let got = ledger.shift();
      expect(got).toEqual(firstQev);
      got = ledger.shift();
      expect(got).toEqual(secondQev);
    });
  });

  describe('upTo()', () => {
    test('iterates over queue events up to the given time', () => {
      const ledger = new QueueEventLedger();
      const firstQev = new QueueEvent(
        'arrive',
        {
          arrivalTime: 4,
          procStartTime: 0,
          procDuration: 128,
        }
      );
      const secondQev = new QueueEvent(
        'arrive',
        {
          arrivalTime: 8,
          procStartTime: 0,
          procDuration: 256,
        }
      );
      const thirdQev = new QueueEvent(
        'arrive',
        {
          arrivalTime: 16,
          procStartTime: 0,
          procDuration: 64,
        }
      );

      ledger.add(firstQev);
      ledger.add(secondQev);
      ledger.add(thirdQev);

      expect([...ledger.upTo(15)]).toEqual([firstQev, secondQev]);
    });
  });

});
