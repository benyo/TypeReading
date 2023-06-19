import { describe, expect, it } from 'vitest';
import { getListPriceWithCumulativeQty } from '../modules/GetListPriceWithCumulativeQty';

describe('test GetListPriceWithCumulativeQty', () => {
  it('GetListPriceWithCumulativeQty', () => {
    const obj1: any = { current: {} };
    const wsMessage1: any = { p: '1.23', q: '10' };
    const result1: any = getListPriceWithCumulativeQty(obj1, wsMessage1);
    expect(result1).toEqual({ '1.23': 10 });

    const obj2: any = { current: result1 };
    const wsMessage2: any = { p: '1.23', q: '20' };
    const result2 = getListPriceWithCumulativeQty(obj2, wsMessage2);
    expect(result2).toEqual({ '1.23': 30 });

    const obj3: any = { current: result2 };
    const wsMessage3: any = { p: '1.23', q: '20' };
    const result3 = getListPriceWithCumulativeQty(obj3, wsMessage3);
    expect(result3).toEqual({ '1.23': 50 });

    const obj4: any = { current: result3 };
    const wsMessage4: any = { p: '1.23', q: '100' };
    const result4 = getListPriceWithCumulativeQty(obj4, wsMessage4);
    expect(result4).toEqual({ '1.23': 150 });
  });
});
