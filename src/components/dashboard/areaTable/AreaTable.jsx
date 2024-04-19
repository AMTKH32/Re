import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Products",
  "Category",
  "Date",
  // "Customer name",
  // "Status",
  // "Amount",
  "Action",
];

const TABLE_DATA = [
  {
    id: 100,
    name: "23324",
    order_id: "Marble",
    date: "April 29,2024",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 400,
  },
  {
    id: 101,
    name: "785678",
    order_id: "Wood Grant",
    date: "April 29,2024",
    customer: "Afaq Karim",
    status: "pending",
    amount: 288,
  },
  {
    id: 102,
    name: "3232",
    order_id: "3D Patterns",
    date: "April 29,2024",
    customer: "Afaq Karim",
    status: "canceled",
    amount: 500,
  },
  {
    id: 103,
    name: "32434",
    order_id: "Elegant Series",
    date: "April 29,2024",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 100,
  },
  {
    id: 104,
    name: "3223",
    order_id: "Pattern",
    date: "April 29,2024",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 60,
  },
  {
    id: 105,
    name: "32233",
    order_id: "Solid",
    date: "April 29,2024",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 80,
  },
];

const AreaTable = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Products</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.name}</td>
                  <td>{dataItem.order_id}</td>
                  <td>{dataItem.date}</td>
                  {/* <td>{dataItem.customer}</td> */}
                  {/* <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataItem.status}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.status}</span>
                    </div>
                  </td> */}
                  {/* <td>${dataItem.amount.toFixed(2)}</td> */}
                  <td className="dt-cell-action">
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
