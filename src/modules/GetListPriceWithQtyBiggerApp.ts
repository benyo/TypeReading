import * as R from 'ramda';

export interface TypeTradeModel {
  [key: string]: string[];
}

export interface AggTradeModel {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  a: number; // Aggregate trade ID
  p: string; // Price
  q: string; // Quantity
  f: number; // First trade ID
  l: number; // Last trade ID
  T: number; // Trade time
  m: boolean; // Is the buyer the market maker? true == SELL -> false == Buy
}
//console.log(dayjs(1686749517768).format(FORMAT_DATE));
export function getListQtyByPrice(
  price: string,
  obj: React.MutableRefObject<TypeTradeModel>
): string[] {
  return R.defaultTo([], R.path(['current', price], obj));
}

export function isPriceExist(price: string) {
  return R.has(price);
}
export function isGreaterThanQtyOfwsMsg(price: string, qty: string) {
  return (currentObj: any) =>
    R.gt(
      Number(qty),
      Number(R.last(R.defaultTo([], R.prop(price, currentObj))))
    );
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
      R.set(R.lensProp(price), [qty])
    )
  )(currentObj);
}
