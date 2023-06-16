import { useRef, useEffect } from 'react';
import * as R from 'ramda';
import {
  getListOfPriceAndQuantities,
  getListPriceWithQtyBiggerApp,
  TypeTradeModel,
} from './modules/GetListPriceWithQtyBiggerApp';
// import dayjs from 'dayjs';
import useWebSocket from 'react-use-websocket';
import Example from './components/example/Example';

// const FORMAT_DATE = 'DD/MM/YYYY HH:mm:ss';

function App(): any {
  const ask = useRef<TypeTradeModel>({});

  const { lastJsonMessage } = useWebSocket(
    'wss://fstream.binance.com/ws/linausdt@aggTrade'
  );

  useEffect(() => {
    ask.current = getListPriceWithQtyBiggerApp(ask, lastJsonMessage);
    console.log(lastJsonMessage);
  });
  const listOfPriceAndQuantities = getListOfPriceAndQuantities(ask.current);

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="container">
          <Example />
          <h1 className="text-3xl font-bold">Type Reading</h1>
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
      </div>
    </>
  );
}

export default App;
