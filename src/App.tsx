import { useRef, useEffect } from 'react';
import {
  getListPriceWithQtyBiggerApp,
  TypeTradeModel,
} from './modules/GetListPriceWithQtyBiggerApp';
// import dayjs from 'dayjs';
import useWebSocket from 'react-use-websocket';
import './App.css';

// const FORMAT_DATE = 'DD/MM/YYYY HH:mm:ss';

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
