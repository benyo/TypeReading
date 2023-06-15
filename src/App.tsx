import { useRef, useEffect } from 'react';
import * as R from 'ramda';
import {
  getListOfPriceAndQuantities,
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
    'wss://fstream.binance.com/ws/linausdt@aggTrade'
  );

  useEffect(() => {
    obj.current = getListPriceWithQtyBiggerApp(obj, lastJsonMessage);
    console.log(obj.current);
  });
  const listOfPriceAndQuantities = getListOfPriceAndQuantities(obj.current);

  return (
    <>
      <div>
        <h1>Type Reading</h1>
        {listOfPriceAndQuantities.map((item: any) => {
          return (
            <div>
              <div>
                {item.price} {R.join('-', R.take(5, item.quantities))}{' '}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
