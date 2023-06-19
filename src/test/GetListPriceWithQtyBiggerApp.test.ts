import { describe, expect, it } from 'vitest';
import {
  getListOfPriceAndQuantities,
  getListPriceWithQtyBiggerApp,
} from '../modules/GetListPriceWithQtyBiggerApp';
import { isPriceExist } from '../modules/Helper';

describe('test GetListPriceWithQtyBiggerApp', () => {
  it('isPriceExistFromWsMsg', () => {
    const obj: any = { current: { '1.23': '10' } };

    const result = isPriceExist('1.23')(obj.current);

    expect(result).toBeTruthy();
  });
  it('getListOfPriceAndQuantities', () => {
    const obj: any = { '1.23': '10' };

    const result = getListOfPriceAndQuantities(obj);

    expect(result).toEqual([{ price: '1.23', quantities: '10' }]);
  });

  it('getListPriceWithQtyBiggerApp', () => {
    const obj1: any = { current: {} };
    const wsMessage1: any = { p: '1.23', q: '10' };
    const result1: any = getListPriceWithQtyBiggerApp(obj1, wsMessage1);
    expect(result1).toEqual({ '1.23': '10' });

    const obj2: any = { current: result1 };
    const wsMessage2: any = { p: '1.23', q: '20' };
    const result2 = getListPriceWithQtyBiggerApp(obj2, wsMessage2);
    expect(result2).toEqual({ '1.23': '20' });

    const obj3: any = { current: result2 };
    const wsMessage3: any = { p: '1.23', q: '20' };
    const result3 = getListPriceWithQtyBiggerApp(obj3, wsMessage3);
    expect(result3).toEqual({ '1.23': '20' });

    const obj4: any = { current: result3 };
    const wsMessage4: any = { p: '1.23', q: '100' };
    const result4 = getListPriceWithQtyBiggerApp(obj4, wsMessage4);
    expect(result4).toEqual({ '1.23': '100' });
  });
});
