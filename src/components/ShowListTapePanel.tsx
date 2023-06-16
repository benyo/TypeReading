import * as R from 'ramda';
export function ShowListTapePanel({ title, colorTitle, listItems }) {
  return (
    <div className="bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg">
      <h1 className={`uppercase font-bold text-center ${colorTitle}`}>
        {title}
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
          {listItems.map((item: any) => {
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
  );
}
