import * as R from 'ramda';

export function isPriceExist(price: string) {
  return R.has(price);
}
