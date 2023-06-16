import { useRef, useEffect } from 'react';
import {
  getListOfPriceAndQuantities,
  getListPriceWithQtyBiggerApp,
  TypeTradeModel,
} from './modules/GetListPriceWithQtyBiggerApp';
// import dayjs from 'dayjs';
import useWebSocket from 'react-use-websocket';
import beams from './assets/beams.jpeg';
import { ShowListTapePanel } from './components/ShowListTapePanel';

// const FORMAT_DATE = 'DD/MM/YYYY HH:mm:ss';

function App(): any {
  const ask = useRef<TypeTradeModel>({});
  const bid = useRef<TypeTradeModel>({});

  const { lastJsonMessage } = useWebSocket(
    'wss://fstream.binance.com/ws/linausdt@aggTrade'
  );

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.m) {
      ask.current = getListPriceWithQtyBiggerApp(ask, lastJsonMessage);
    } else if (lastJsonMessage) {
      bid.current = getListPriceWithQtyBiggerApp(bid, lastJsonMessage);
    }
  });
  const listAskOfPriceAndQuantities = getListOfPriceAndQuantities(ask.current);
  const listBidOfPriceAndQuantities = getListOfPriceAndQuantities(bid.current);

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img
          src={beams}
          alt=""
          className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          width="1308"
        />
        <div className="relative mb-8 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            Type Reading
          </h1>
        </div>
        <div className="relative md:mx-auto md:max-w-lg sm:px-10">
          <div className="flex">
            <div className="flex-auto pr-4">
              <ShowListTapePanel
                listItems={listBidOfPriceAndQuantities}
                title="Bid"
                colorTitle="text-green-700"
              />
            </div>
            <div className="flex-auto pl-4">
              <ShowListTapePanel
                listItems={listAskOfPriceAndQuantities}
                title="Ask"
                colorTitle="text-red-700"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
