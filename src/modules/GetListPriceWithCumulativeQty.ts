import * as R from 'ramda';
import { AggTradeModel, TypeTradeCumulateModel } from '../interfaces/common';
import { isPriceExist } from './Helper';

export function getListPriceWithCumulativeQty(
  obj: React.MutableRefObject<TypeTradeCumulateModel>,
  aggTradeModel: AggTradeModel | null
) {
  if (!aggTradeModel) {
    return obj.current || {};
  }
  const { p: price, q: qty } = R.pick(['p', 'q'], aggTradeModel);
  const currentObj = obj.current || {};

  return R.ifElse(
    isPriceExist(price),
    R.set(
      R.lensProp<any>(price),
      R.sum([Number(qty), R.defaultTo(0, R.prop(price, currentObj))])
    ),
    R.set(R.lensProp<any>(price), Number(qty))
  )(currentObj);
}
