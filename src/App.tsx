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
export function extractPriceFromWebSocketMessage(
  webSocketMessage: WebSocketMessage
): string {
  return R.prop('q', parseJsonFromWsMsj(webSocketMessage));
}

export function extractQtyFromWebSocketMessage(
  webSocketMessage: WebSocketMessage
): string {
  return R.path(['data', 'q'], webSocketMessage);
}

export function isPriceExistFromWebSocketMessage(
  obj: React.MutableRefObject<TypeTradeModel>,
  webSocketMessage: WebSocketMessage
): boolean {
  const isPriceExist = R.has(
    extractPriceFromWebSocketMessage(webSocketMessage)
  );
  return isPriceExist(R.prop(obj, 'current'));
}

export function getListQtyByPrice(
  obj: React.MutableRefObject<TypeTradeModel>,
  price: string
): string[] {
  return R.path(obj, ['current', price]);
}

export function parseJsonFromWsMsj(webSocketMessage: WebSocketMessage) {
  return R.pipe(R.prop('data'), JSON.parse)(webSocketMessage);
}

function App(): any {
  // const obj = useRef<TypeTradeModel>({});

  // const { lastMessage } = useWebSocket(
  //   'wss://fstream.binance.com/ws/tlmusdt@aggTrade'
  // );
  // if (lastMessage) {
  //   console.log(lastMessage.data);
  // }

  // useEffect(() => {
  //   if (lastMessage && isPriceExistFromWebSocketMessage(obj, lastMessage)) {
  //     const price = extractPriceFromWebSocketMessage(lastMessage);
  //     const qty = extractQtyFromWebSocketMessage(lastMessage);
  //     const listQtyByPrice = getListQtyByPrice(obj, price);
  //     const lastQty = R.last(listQtyByPrice);
  //     const isGreaterThanQtyOfWebsocketMessage = R.gt(qty, lastQty);
  //     if (isGreaterThanQtyOfWebsocketMessage) {
  //       const newListQtyByPrice = R.append(listQtyByPrice, qty);
  //       const l = R.lensProp(price);
  //       obj.current = R.set(l, newListQtyByPrice, obj.current);
  //     }
  //   } else if (lastMessage) {
  //     const price = extractPriceFromWebSocketMessage(lastMessage);
  //     console.log(price);
  //     const qty = extractQtyFromWebSocketMessage(lastMessage);
  //     obj.current = R.set(R.lensProp(price), [qty], obj.current);
  //   }
  //   console.log(obj.current);
  // });

  return (
    <>
      <div>Hola</div>
    </>
  );
}

export default App;
