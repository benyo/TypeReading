import { describe, expect, it } from 'vitest';
import { abbreviateNumber } from '../modules/AbbreviateNumber';

describe('AbbreviateNumber', () => {
  it('1000 should be get 1k', () => {
    const num = 1000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('1k');
  });

  it('150000 should be get 150k', () => {
    const num = 150000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('150k');
  });

  it('1500000 should be get 1.50M', () => {
    const num = 1500000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('1.50M');
  });

  it('153000000 should be get 153M', () => {
    const num = 153000000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('153M');
  });

  it('153000000 should be get 1.53B', () => {
    const num = 1530000000;

    const result = abbreviateNumber(num);

    expect(result).toEqual('1.53B');
  });

  it('15356120 should be get 15.36M', () => {
    const num = 15356120;

    const result = abbreviateNumber(num);

    expect(result).toEqual('15.36M');
  });
});
