import { AddToCartContext } from "@/context/AddToCartContext";
import { useContext } from "react";
import Link from "next/link";
import { CLIENT_ID, APP_SECRET } from "../Config/Config";
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "react-hot-toast";
const URI = "http://localhost:9000";

const OrderSummary = () => {
  const cartValue = useContext(AddToCartContext) as any;

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Orders",
            amount: {
              currency_code: "USD",
              value: cartValue.state.total,
            },
          },
        ],
      })
      .then((orderID: any) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const CallRequest = (address:any, paymentId:any) => {
    axios.post(
      `${URI}/api/v1/orders`,
      {
        products: cartValue.state.cartItems,
        totalPrice: cartValue.state.total,
        shippingAddress: address,
        paymentId: paymentId,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    ).then((res)=>{
      toast.success(res.data.message)
        cartValue.EmptyCart();
        // console.log(res.data);
        // setShow(false)
    }).catch((e)=>{
      toast.error(e.response.data.message)
        console.log(e)
    })
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function (details: any) {
      const { payer } = details;
      CallRequest(details.purchase_units[0].shipping.address,details.id)

      // const shippingAddress = payer.address;
      // Use the shippingAddress object as needed (e.g., store in state, display to the user, etc.)
      // console.log("Shipping Address:", payer);

      // const accessTokenResponse = await axios.post(`${URI}/api/v1/getAccessToken` ,{},{
      //     headers: { authorization: localStorage.getItem("token") },
      //   });
      // const accessToken = accessTokenResponse.data.accessToken;
      // const orderId = details.id;

      // // console.log(accessToken)

      // // // Use the access token and orderId to fetch the order details, including the address
      // const orderDetailsResponse = await axios.get(
      //   `https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${accessToken}`,
      //     },
      //   }
      // );

      // const shippingAddress = orderDetailsResponse.data.purchase_units[0].shipping.address;
      // console.log('Shipping Address:', shippingAddress ,details);

      console.log(details);
      setSuccess(true);
    });
  };

  useEffect(() => {
    if (success) {
    //   alert("Payment successful!!");
    // toast.success("payment successfull");
    setShow(false)
    //   console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);

  //capture likely error
  const onError = (data: any, actions: any) => {
    setErrorMessage("An Error occured with your payment ");
  };

  // useEffect(()=>{
  // toast.error(ErrorMessage)
  // },[ErrorMessage])

  return (
    <div className="w-full lg:w-1/3 ">
      <p className="border-gray-500 border-b-2 pb-4 text-lg">Order Summary</p>
      <div className="border-gray-500 border-b-2 pb-2">
        <div className="flex mt-6 text-gray-600">
          <p className="mr-auto">Subtotal</p>
          <p>${cartValue.state.total}.00</p>
        </div>
        <p className="underline mt-2">Estimate Shipping</p>
      </div>
      <div className="flex text-xl mt-5 mb-8">
        <p className="mr-auto">Total</p>
        <p className="font-bold text-orange-500">${cartValue.state.total}.00</p>
      </div>
      <PayPalScriptProvider options={{ "client-id": CLIENT_ID } as any}>
        <div className="text-center">
          <div>
            <button
              onClick={() => setShow(true)}
              className="w-full border-2 border-orange-600 py-2 text-white bg-orange-500"
            >
              {/* <Link href="/Checkout"> */}
              CheckOut
              {/* </Link> */}
            </button>
          </div>
          <br></br>
          {show && cartValue?.state?.cartItems?.length > 0? (
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          ) : null}
        </div>
      </PayPalScriptProvider>
      <div className="flex items-center justify-center font-bold mb-4 mt-4 text-gray-950">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-lock-fill"
            viewBox="0 0 16 16"
            id="IconChangeColor"
          >
            {" "}
            <path
              d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
              id="mainIconPathAttribute"
            ></path>{" "}
          </svg>
        </span>
        Secure CheckOut
      </div>
    </div>
  );
};

export default OrderSummary;
