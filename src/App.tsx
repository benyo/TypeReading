import { useRef, useEffect } from 'react';
import * as R from 'ramda';
// import dayjs from 'dayjs';
import useWebSocket from 'react-use-websocket';
import './App.css';

// const FORMAT_DATE = 'DD/MM/YYYY HH:mm:ss';

export interface TypeTradeModel {
  [key: string]: string[];
}
export interface WebSocketMessage {
  data?: AggTrade;
}
export interface AggTrade {
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
export function extractPriceFromWsMsg(
  webSocketMessage: WebSocketMessage
): string {
  return R.prop('p', parseJsonFromWsMsg(webSocketMessage));
}

export function extractQtyFromWsMsg(
  webSocketMessage: WebSocketMessage
): string {
  return R.prop('q', parseJsonFromWsMsg(webSocketMessage));
}

export function isPriceExistFromWsMsg(
  obj: React.MutableRefObject<TypeTradeModel>,
  webSocketMessage: WebSocketMessage
): boolean {
  const isPriceExist = R.has(extractPriceFromWsMsg(webSocketMessage));
  return isPriceExist(R.prop('current', obj));
}

export function getListQtyByPrice(
  obj: React.MutableRefObject<TypeTradeModel>,
  price: string
): string[] {
  return R.path(['current', price], obj);
}

export function parseJsonFromWsMsg(webSocketMessage: WebSocketMessage) {
  return R.pipe(R.prop('data'), JSON.parse)(webSocketMessage);
}
export function getListPriceWithQtyBiggerApp(
  obj: React.MutableRefObject<TypeTradeModel>,
  wsMsg: WebSocketMessage | null
) {
  let result = {};
  if (wsMsg && isPriceExistFromWsMsg(obj, wsMsg)) {
    const price = extractPriceFromWsMsg(wsMsg);
    const qty = extractQtyFromWsMsg(wsMsg);
    const listQtyByPrice = getListQtyByPrice(obj, price);
    const lastQty = R.last(listQtyByPrice);
    const isGreaterThanQtyOfWebsocketMessage = R.gt(
      Number(qty),
      Number(lastQty)
    );
    if (isGreaterThanQtyOfWebsocketMessage) {
      const newListQtyByPrice = R.append(qty, listQtyByPrice);
      result = R.set(R.lensProp(price), newListQtyByPrice, obj.current);
    }
  } else if (wsMsg) {
    const price = extractPriceFromWsMsg(wsMsg);
    const qty = extractQtyFromWsMsg(wsMsg);
    result = R.set(R.lensProp(price), [qty], obj.current);
  }
  return result;
}

function App(): any {
  const obj = useRef<TypeTradeModel>({});

  const { lastMessage } = useWebSocket(
    'wss://fstream.binance.com/ws/tlmusdt@aggTrade'
  );

  useEffect(() => {
    obj.current = getListPriceWithQtyBiggerApp(obj, lastMessage);
    console.log(obj.current);
  });

  return (
    <>
      <div>Hola</div>
    </>
  );
}

export default App;
