import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AddToCartContext from "@/context/CartContext";

interface CartProps {
  CloseCart: () => void;
}
interface CartItem {
  images: string[];
  title: string;
  price: number;
}


export default function Cart({ CloseCart }: CartProps) {
  const value = useContext(AddToCartContext);
  const ProductItems = value.state.cartItems

  return (
    <div className="fixed top-0 right-0 w-full lg:w-1/4 h-full bg-gray-100">
      <div className="flex items-center text-2xl py-4 bg-gray-950 text-white">
        {" "}
        <button className="ml-5 mr-auto text-gray-400" onClick={CloseCart}>
          &gt;
        </button>
        <div className="mr-40">Cart</div>
      </div>
      {/* all cart items */}
      <div className="w-full h-auto overflow-hidden lg:h-2/4 lg:overflow-y-auto">
        {ProductItems?.map((items:any, idx:any) => (
          <div className="border-b-2 border-gray-200 p-4 mx-2" key={idx}>
            <div className="mt-2 flex">
              <div>
                <Image
                  className="inline-block w-24 h-24"
                  src={items.images[0]}
                  alt="ProductImage"
                  width={600}
                  height={600}
                />
              </div>
              <div className="ml-4 w-4/5">
                <div className="flex gap-5 items-center">
                  <p className="mr-auto">{items.title}</p>
                </div>
                <p className="mt-2">${Math.ceil(items.price - items.price * 10 / 100)}.00</p>
                <div className="border-2 border-gray-600 w-16 h-6 relative overflow-hidden grid grid-cols-3 place-content-center text-center">
                  <button>+</button>
                  <span>1</span>
                  <button>-</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SubTotal */}

      <div className="text-2xl pb-5 border-b-2 mt-10 border-gray-200">
        <p className="ml-4">Subtotal</p>
        <p className="ml-4">${value.state.total}.00</p>
      </div>

      <div className="m-4">
        <button className="w-full h-auto bg-orange-500 border-2 border-orange-500 text-white">
          <Link href="/Checkout">View Cart</Link>
        </button>
      </div>
    </div>
  );
}
