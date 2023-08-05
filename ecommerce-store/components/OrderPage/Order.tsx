import ToastContext from "@/context/ToastContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
const URL = "http://localhost:9000";

const OrderPage = () => {
  const router = useRouter();
  const { toast } = useContext(ToastContext) as any;
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  const CallFetchAllOrders = async() =>{
  await axios
  .get(`${URL}/api/v1/orders?page=${page}`, {
    headers: { authorization: localStorage.getItem("token") },
  })
  .then((res) => {
    setOrders(res.data.orders);
    console.log(res.data);
  })
  .catch((e) => {
    toast.error(e.response.data.message);
  });
  }
  useEffect(()=>{
  if(!localStorage.getItem("token")){
    router.push("/")
  }
  },[])

  useEffect(() => {
    CallFetchAllOrders()
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

  const handleUpdateStatus = (id: any , status : any) => {
    axios
      .patch(
        `${URL}/api/v1/orders/${id}/status`,
        { status: status },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        // setOrders(res.data.orders);
        CallFetchAllOrders()
        toast.success(res.data.message);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
  return (
    <>
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
                      Action
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
                      <td
                        className="px-6"
                        
                      >
                        {items.status === "Placed" && (
                          <button className="px-2 py-2 bg-red-500 rounded-lg shadow-lg" onClick={() => handleUpdateStatus(items._id , "Cancelled")}>Cancel</button>
                        )}
                        {items.status === "Delivered" &&  <button className="px-2 py-2 bg-orange-500 rounded-lg shadow-lg" onClick={() => handleUpdateStatus(items._id , "Return")}>Return</button>}
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

export default OrderPage;
