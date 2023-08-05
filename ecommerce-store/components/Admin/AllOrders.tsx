import ToastContext from "@/context/ToastContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UpdateStatus from "./modal/updateStatusModal";
const URL = "http://localhost:9000";

const AllOrders = () => {
  const router = useRouter();
  const { toast } = useContext(ToastContext) as any;
  const [id, setId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const CallAllOrdersRequest = async () => {
    await axios
      .get(`${URL}/api/v1/orders/dashboard?page=${page}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setOrders(res.data.orders);
        console.log(res.data);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  useEffect(() => {
    CallAllOrdersRequest();
  }, [page]);

  const handleNavigate = (id: any) => {
    router.push(`/OrderSummary?order=${id}`);
  };

  const handlePage = (mode: any) => {
    switch (mode) {
      case "next":
        if (orders.length === 6) {
          return setPage(page + 1);
        }
        break;
      case "back": {
        if (page > 1) {
          return setPage(page - 1);
        }
        break;
      }
      default:
        break;
    }
  };

  const handleUpdateStatus = (id: any) => {
    setId(id);
    setShowModal(true);

  };
  const closeModal = ()=>{
    setShowModal(false)
  }
  return (
    <>
      {showModal && (
        <div className="flex justify-center">
          <UpdateStatus
            id={id}
            CallAllOrdersRequest={CallAllOrdersRequest}
            closeModal={closeModal}
          ></UpdateStatus>
        </div>
      )}
      <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-pink-900 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-lg text-white">
                    Order History
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto h-auto ">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      OrderID
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      PaymentID
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Status
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Address
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Total Amount
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                    View Detail
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders?.map((items: any, idx: any) => (
                    <tr
                      key={idx}
                      className="border-b-2 border-pink-950 cursor-pointer hover:bg-pink-950"
                      
                    >
                      <td className="px-6 py-4">
                        ORD{items?._id?.split("").slice(20, 24).join("")}
                      </td>
                      <td className="px-6">
                        PAY{items?.paymentId?.split("").splice(0, 5).join("")}
                      </td>
                      <td className="px-6">{items.status}</td>
                      <td className="px-6">
                        {items.shippingAddress.admin_area_2}
                      </td>
                      <td className="px-6">${items.totalPrice}.00</td>
                      <td className="px-6"><button className="px-4 py-2 bg-blue-500 rounded-lg shadow-lg" onClick={() => handleNavigate(items._id)}>View</button></td>
                      <td className="px-6">
                        <button
                          onClick={() => handleUpdateStatus(items._id)}
                          className="px-2 py-2 bg-yellow-600 rounded-lg shadow-lg"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex m-auto px-2 py-2 gap-4">
              <button onClick={() => handlePage("back")}>&lt;</button>
              {page}
              <button onClick={() => handlePage("next")}>&gt;</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllOrders;
