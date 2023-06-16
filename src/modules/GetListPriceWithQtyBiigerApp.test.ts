import { describe, expect, it } from 'vitest';
import {
  getListQtyByPrice,
  getListOfPriceAndQuantities,
  getListPriceWithQtyBiggerApp,
  abbreviateNumber,
} from './GetListPriceWithQtyBiggerApp';

describe('test GetListPriceWithQtyBiggerApp', () => {
  it('isPriceExistFromWsMsg', () => {
    const obj: any = { current: { '1.23': ['10'] } };

    const result = getListQtyByPrice('1.23', obj);

    expect(result).toEqual(['10']);
  });

  it('abbreviateNumber 1000 should be get 1k', () => {
    const num = 1000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('1k');
  });

  it('abbreviateNumber 150000 should be get 150k', () => {
    const num = 150000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('150k');
  });

  it('abbreviateNumber 1500000 should be get 1.5M', () => {
    const num = 1500000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('1.5M');
  });

  it('abbreviateNumber 15300000 should be get 15.3M', () => {
    const num = 15300000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('15.3M');
  });

  it('abbreviateNumber 153000000 should be get 153M', () => {
    const num = 153000000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('153M');
  });

  it('abbreviateNumber 153000000 should be get 1.53B', () => {
    const num = 1530000000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('1.53B');
  });

  it('getListOfPriceAndQuantities', () => {
    const obj: any = { '1.23': ['10'] };

    const result = getListOfPriceAndQuantities(obj);

    expect(result).toEqual([{ price: '1.23', quantities: ['10'] }]);
  });

  it('getListPriceWithQtyBiggerApp', () => {
    const obj1: any = { current: {} };
    const wsMessage1: any = { p: '1.23', q: '10' };
    const result1: any = getListPriceWithQtyBiggerApp(obj1, wsMessage1);
    expect(result1).toEqual({ '1.23': ['10'] });

    const obj2: any = { current: result1 };
    const wsMessage2: any = { p: '1.23', q: '20' };
    const result2 = getListPriceWithQtyBiggerApp(obj2, wsMessage2);
    expect(result2).toEqual({ '1.23': ['10', '20'] });

    const obj3: any = { current: result2 };
    const wsMessage3: any = { p: '1.23', q: '20' };
    const result3 = getListPriceWithQtyBiggerApp(obj3, wsMessage3);
    expect(result3).toEqual({ '1.23': ['10', '20'] });

    const obj4: any = { current: result3 };
    const wsMessage4: any = { p: '1.23', q: '100' };
    const result4 = getListPriceWithQtyBiggerApp(obj4, wsMessage4);
    expect(result4).toEqual({ '1.23': ['10', '20', '100'] });
  });
});
