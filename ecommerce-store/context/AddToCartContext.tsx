import React, { useCallback, useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ToastContext from "./ToastContext";
const URL = "http://localhost:9000";

const AddToCartContext = React.createContext(null) as any;

const CartContextProvider = ({ children }: any) => {
  const { toast } = useContext(ToastContext) as any;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const CallRequest = () => {
    // console.log("hit")
    axios
      .get(`${URL}/api/v1/user/cartItems`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        // console.log(res.data)
        setCartItems(res.data.CartItems);
      })
      .catch((e) => {
        // toast.error(e.response.data.message);
      });
  };

  const IncreaseQty = (productId: any) => {
    axios
      .patch(
        `${URL}/api/v1/users/cart/update/${productId}`,
        { mode: "add" },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        // console.log(res.data);
        CallRequest();
      })
      .catch((e) => {
        console.log(e);
        // toast.error(e.response.data.message);
      });
  };

  const DecreseQty = (productId: any) => {
    axios
      .patch(
        `${URL}/api/v1/users/cart/update/${productId}`,
        { mode: "less" },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        // console.log(res.data);
        CallRequest();
      })
      .catch((e) => {
        console.log(e);
        // toast.error(e.response.data.message);
      });
  };

  useEffect(() => {
    // CallRequest()
    // console.log("called")
    let newTotal = 0;
    cartItems?.forEach((item: any) => {
      newTotal +=
        Math.ceil(item.price - (item.price * item.discountPercent) / 100) *
        item.quantity;
    });
    // console.log(newTotal)
    setTotal(newTotal);
  }, [cartItems]);

  const EmptyCart = async () => {
    await axios
      .patch(
        `${URL}/api/v1/users/cart/clear`,
        {},
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        setCartItems(res.data.user.CartItems);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  const handleDeleteItem = (productId: any) => {
    axios
      .delete(`${URL}/api/v1/users/cart/delete/${productId}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        toast.success("Cart Item Removed");
        console.log(res.data);
        CallRequest();
      })
      .catch((e) => {
        console.log(e);
        // toast.error(e.response.data.message);
      });
  };
  return (
    <AddToCartContext.Provider
      value={{
        state: { cartItems, total },
        setCartItems: setCartItems,
        setTotal: setTotal,
        IncreaseQty: IncreaseQty,
        DecreseQty: DecreseQty,
        EmptyCart: EmptyCart,
        handleDeleteItem: handleDeleteItem,
        CallRequest: CallRequest,
      }}
    >
      {children}
    </AddToCartContext.Provider>
  );
};

export { AddToCartContext, CartContextProvider };
