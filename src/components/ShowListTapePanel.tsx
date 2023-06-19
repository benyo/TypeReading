import * as R from 'ramda';
import { abbreviateNumber } from '../modules/AbbreviateNumber';
export function ShowListTapePanel({
  title,
  colorTitle,
  listItems,
  formatQty,
}: any) {
  const listItemOrderdByBiggerQty = R.take(
    10,
    R.sort<any>(R.descend(R.prop('quantites')), listItems)
  );
  return (
    <div className="bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg">
      <h1 className={`uppercase font-bold text-center ${colorTitle}`}>
        {title}
      </h1>
      <table className="bg-white w-full">
        <thead>
          <tr>
            <th className="py-3 px-6 font-semibold uppercase border-b border-gray-300">
              Price
            </th>
            <th className="py-3 px-6 font-semibold uppercase border-b border-gray-300">
              Qty
            </th>
          </tr>
        </thead>
        <tbody>
          {listItemOrderdByBiggerQty.map((item: any) => {
            return (
              <tr>
                <td className="py-4 px-6 border-b border-gray-300">
                  {item.price}
                </td>
                <td className="py-4 px-6 border-b border-gray-300">
                  {abbreviateNumber(
                    formatQty
                      ? Number(R.last(item.quantities))
                      : item.quantities
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
