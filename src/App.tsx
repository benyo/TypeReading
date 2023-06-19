import { useRef, useEffect } from 'react';
import {
  getListOfPriceAndQuantities,
  getListPriceWithQtyBiggerApp,
} from './modules/GetListPriceWithQtyBiggerApp';
// import dayjs from 'dayjs';
import useWebSocket from 'react-use-websocket';
import beams from './assets/beams.jpeg';
import { ShowListTapePanel } from './components/ShowListTapePanel';
import { TypeTradeCumulateModel, TypeTradeModel } from './interfaces/common';
import { getListPriceWithCumulativeQty } from './modules/GetListPriceWithCumulativeQty';

// const FORMAT_DATE = 'DD/MM/YYYY HH:mm:ss';

function App(): any {
  const ask = useRef<TypeTradeModel>({});
  const bid = useRef<TypeTradeModel>({});
  const askWithCumulateQty = useRef<TypeTradeCumulateModel>({});
  const bidWithCumulateQty = useRef<TypeTradeCumulateModel>({});

  const { lastJsonMessage } = useWebSocket(
    'wss://fstream.binance.com/ws/linausdt@aggTrade'
  );

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.m) {
      ask.current = getListPriceWithQtyBiggerApp(ask, lastJsonMessage);
      askWithCumulateQty.current = getListPriceWithCumulativeQty(
        askWithCumulateQty,
        lastJsonMessage
      );
    } else if (lastJsonMessage) {
      bid.current = getListPriceWithQtyBiggerApp(bid, lastJsonMessage);
      bidWithCumulateQty.current = getListPriceWithCumulativeQty(
        bidWithCumulateQty,
        lastJsonMessage
      );
    }
  });
  const listAskOfPriceAndQuantities = getListOfPriceAndQuantities(ask.current);
  const listBidOfPriceAndQuantities = getListOfPriceAndQuantities(bid.current);
  const listAskOfPriceAndQuantitiesWithCumulateQty =
    getListOfPriceAndQuantities(askWithCumulateQty.current);
  const listBidOfPriceAndQuantitiesWithCumulateQty =
    getListOfPriceAndQuantities(bidWithCumulateQty.current);

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

        <div className="grid grid-cols-4 z-10 px-2 ">
          <div className="px-4">
            <ShowListTapePanel
              listItems={listBidOfPriceAndQuantities}
              title="Bid"
              formatQty="true"
              colorTitle="text-green-700"
            />
          </div>
          <div className="px-4">
            <ShowListTapePanel
              listItems={listAskOfPriceAndQuantities}
              title="Ask"
              formatQty="true"
              colorTitle="text-red-700"
            />
          </div>
          <div className="px-4">
            <ShowListTapePanel
              listItems={listAskOfPriceAndQuantitiesWithCumulateQty}
              title="Bid"
              colorTitle="text-green-700"
            />
          </div>
          <div className="px-4">
            <ShowListTapePanel
              listItems={listBidOfPriceAndQuantitiesWithCumulateQty}
              title="Ask"
              colorTitle="text-red-700"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
