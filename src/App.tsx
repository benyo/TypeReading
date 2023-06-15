import { useRef, useEffect } from 'react';
import * as R from 'ramda';
// import dayjs from 'dayjs';
import useWebSocket from 'react-use-websocket';
import './App.css';

// const FORMAT_DATE = 'DD/MM/YYYY HH:mm:ss';

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
export function extractPriceFromWsMsg(wsMsg: AggTradeModel): string {
  return R.prop('p', wsMsg);
}

export function extractQtyFromWsMsg(wsMsg: AggTradeModel): string {
  return R.prop('q', wsMsg);
}

export function isPriceExistFromWsMsg(
  obj: React.MutableRefObject<TypeTradeModel>,
  wsMsg: AggTradeModel
): boolean {
  const isPriceExist = R.has(extractPriceFromWsMsg(wsMsg));
  return isPriceExist(R.prop('current', obj));
}

export function getListQtyByPrice(
  obj: React.MutableRefObject<TypeTradeModel>,
  price: string
): string[] {
  return R.path(['current', price], obj);
}

export function getListPriceWithQtyBiggerApp(
  obj: React.MutableRefObject<TypeTradeModel>,
  aggTradeModel: AggTradeModel | null
) {
  let result = obj.current || {};
  if (aggTradeModel && isPriceExistFromWsMsg(obj, aggTradeModel)) {
    const price = extractPriceFromWsMsg(aggTradeModel);
    const qty = extractQtyFromWsMsg(aggTradeModel);
    const listQtyByPrice = getListQtyByPrice(obj, price);
    const lastQty = R.last(listQtyByPrice);
    const isGreaterThanQtyOfwsMsg = R.gt(Number(qty), Number(lastQty));
    if (isGreaterThanQtyOfwsMsg) {
      const newListQtyByPrice = R.append(qty, listQtyByPrice);
      result = R.set(R.lensProp(price), newListQtyByPrice, obj.current);
    }
  } else if (aggTradeModel) {
    const price = extractPriceFromWsMsg(aggTradeModel);
    const qty = extractQtyFromWsMsg(aggTradeModel);
    result = R.set(R.lensProp(price), [qty], obj.current);
  }
  return result;
}

function App(): any {
  const obj = useRef<TypeTradeModel>({});

  const { lastJsonMessage } = useWebSocket(
    'wss://fstream.binance.com/ws/tlmusdt@aggTrade'
  );

  useEffect(() => {
    obj.current = getListPriceWithQtyBiggerApp(obj, lastJsonMessage);
    console.log(obj.current);
  });

  return (
    <>
      <div>Hola</div>
    </>
  );
}

export default App;
