import { useRef, useEffect } from 'react';
import * as R from 'ramda';
import {
  getListOfPriceAndQuantities,
  getListPriceWithQtyBiggerApp,
  TypeTradeModel,
} from './modules/GetListPriceWithQtyBiggerApp';
// import dayjs from 'dayjs';
import useWebSocket from 'react-use-websocket';
import beams from './assets/beams.jpeg';

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
    } else {
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
              <div className="bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg">
                <h1 className="uppercase font-bold text-center text-green-700">
                  Compras
                </h1>
                <table>
                  <thead>
                    <tr>
                      <th className="py-3 px-6 font-semibold uppercase border-b border-gray-300">
                        Precio
                      </th>
                      <th className="py-3 px-6 font-semibold uppercase border-b border-gray-300">
                        Cantidad
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listBidOfPriceAndQuantities.map((item: any) => {
                      return (
                        <tr>
                          <td className="py-4 px-6 border-b border-gray-300">
                            {item.price}
                          </td>
                          <td className="py-4 px-6 border-b border-gray-300">
                            {R.last(item.quantities)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex-auto pl-4">
              <div className="bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg">
                <h1 className="uppercase font-bold text-center text-red-700">
                  Venta
                </h1>
                <table className="bg-white">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 font-semibold uppercase border-b border-gray-300">
                        Precio
                      </th>
                      <th className="py-3 px-6 font-semibold uppercase border-b border-gray-300">
                        Cantidad
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listAskOfPriceAndQuantities.map((item: any) => {
                      return (
                        <tr>
                          <td className="py-4 px-6 border-b border-gray-300">
                            {item.price}
                          </td>
                          <td className="py-4 px-6 border-b border-gray-300">
                            {R.last(item.quantities)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
