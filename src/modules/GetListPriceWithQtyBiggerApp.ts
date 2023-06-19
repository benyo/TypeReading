import * as R from 'ramda';
import { AggTradeModel, TypeTradeModel } from '../interfaces/common';
import { isPriceExist } from './Helper';

//console.log(dayjs(1686749517768).format(FORMAT_DATE));
export function getListQtyByPrice(
  price: string,
  obj: React.MutableRefObject<TypeTradeModel>
): string[] {
  return R.defaultTo([], R.path(['current', price], obj));
}

export function isGreaterThanQtyOfwsMsg(price: string, qty: string) {
  return (currentObj: any) =>
    R.gt(
      Number(qty),
      Number(R.last(R.defaultTo([], R.prop(price, currentObj))))
    );
}

export function getListOfPriceAndQuantities(currentObj: any) {
  return R.pipe(
    R.toPairs,
    R.map(([price, quantities]) => ({ price, quantities }))
  )(currentObj);
}

export function getListPriceWithQtyBiggerApp(
  obj: React.MutableRefObject<TypeTradeModel>,
  aggTradeModel: AggTradeModel | null
) {
  if (!aggTradeModel) {
    return obj.current || {};
  }
  const { p: price, q: qty } = R.pick(['p', 'q'], aggTradeModel);
  const currentObj = obj.current || {};
  const listQtyByPrice = getListQtyByPrice(price, obj);

  return R.pipe(
    R.ifElse(
      isPriceExist(price),
      R.ifElse(
        isGreaterThanQtyOfwsMsg(price, qty),
        R.set(R.lensProp(price), R.append(qty, listQtyByPrice)),
        R.identity
      ),
      R.set(R.lensProp<any>(price), [qty])
    )
  )(currentObj);
}
