import { useState, useContext } from "react";
import axios from "axios";
import ToastContext from "@/context/ToastContext";
const URL = "http://localhost:9000";


const UpdateStatus = ({ id, CallAllOrdersRequest, closeModal }: any) => {
  const [status, setStatus] = useState(null);
  const { toast } = useContext(ToastContext) as any;

  const handleChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .patch(
        `${URL}/api/v1/orders/${id}/status`,
        { status: status },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        CallAllOrdersRequest();
        closeModal();
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
  return (
    <>
      <div className="fixed w-1/3 h-1/2 bg-gray-800 z-20 top-50 rounded-lg shadow-lg flex-1 mt-10 px-10 text-white py-10">
        <button
          className="absolute right-10 top-4 text-2xl hover:text-red-500"
          onClick={closeModal}
        >
          X
        </button>
        <h1 className="text-2xl mb-6">Set Status As:</h1>
        <div>
          {" "}
          <input
            type="radio"
            id="Placed"
            name="Status"
            value={"Placed"}
            // checked={formData.IsDiscount === false}
            onChange={handleChange}
          />
          <label htmlFor="Placed" className="text-2xl px-2">
            Placed
          </label>
        </div>
        <div>
          {" "}
          <input
            type="radio"
            id="Delivered"
            name="Status"
            value={"Delivered"}
            // checked={formData.IsDiscount === false}
            onChange={handleChange}
          />
          <label htmlFor="Delivered" className="text-2xl px-2">
            Delivered
          </label>
        </div>
        <div>
          {" "}
          <input
            type="radio"
            id="Cancelled"
            name="Status"
            value={"Cancelled"}
            // checked={formData.IsDiscount === false}
            onChange={handleChange}
          />
          <label htmlFor="Cancelled" className="text-2xl px-2">
            Cancelled
          </label>
        </div>
        <div>
          {" "}
          <input
            type="radio"
            id="Return"
            name="Status"
            value={"Return"}
            // checked={formData.IsDiscount === false}
            onChange={handleChange}
          />
          <label htmlFor="Return" className="text-2xl px-2">
            Return / Replace
          </label>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 hover:bg-green-500 rounded-lg shadow-md border-2 font-bold"
          >
            Set
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateStatus;
