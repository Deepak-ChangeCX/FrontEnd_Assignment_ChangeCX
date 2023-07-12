import { useContext, useEffect, useState } from "react";
import ScrollImage from "./scrollImage";
import Image from "next/image";
import Cart from "./Cart";
import ProductIdContext from "@/context/ProductId";
import AddToCartContext from "@/context/CartContext";

export default function ProductPage() {
  const value = useContext(ProductIdContext);
  const cartvalue = useContext(AddToCartContext)
  const [productInfoVisible, setProductInfoVisible] = useState(false);
  const [productDetail, setProduct] = useState({});
  const [image , setImages] = useState('')
  const [refundPolicyVisible, setRefundPolicyVisible] = useState(false);
  const [shippingInfoVisible, setShippingInfoVisible] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const product = value.state;
    setProduct(product.product);
    setImages(product.product.images[0])
    // console.log(product.product)
  }, [value]);

  const handleChangeImage = (link)=>{
     setImages(link)
  }

  const toggleCart = () => {
    setShowCart(true);
    cartvalue.setCartItems([...cartvalue.state.cartItems , productDetail])
    cartvalue.setTotal(cartvalue.state.total + Math.ceil(productDetail?.price - (productDetail?.price * 10 / 100)))
  };

  const CloseCart = ()=>{
    setShowCart(false)
  }

  const toggleProductInfo = () => {
    setProductInfoVisible(!productInfoVisible);
  };

  const toggleRefundPolicy = () => {
    setRefundPolicyVisible(!refundPolicyVisible);
  };

  const toggleShippingInfo = () => {
    setShippingInfoVisible(!shippingInfoVisible);
  };

  return (
    <div className="px-5 mt-10 lg:pl-48">
      <style>
        {`.image-cont::-webkit-scrollbar{
                display:none;
            }`}
      </style>
      <div className="flex flex-wrap items-center mb-10">
        <div className="mr-auto mt-2 lg:mr-64">
          Home/{productDetail.category === "mens-shirts" ? "Men" : "Women"}/<span className="text-gray-500">{productDetail?.brand}</span>
        </div>
        <div className="text-gray-500">&lt; Prev | Next &gt;</div>
      </div>

      {/* Side Social Media Icons */}
      <div className="grid-cols-1 gap-2 absolute top-36 right-10 m-0 hidden lg:grid">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-instagram"
          viewBox="0 0 16 16"
          id="IconChangeColor"
        >
          {" "}
          <path
            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
            id="mainIconPathAttribute"
          ></path>{" "}
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-facebook"
          viewBox="0 0 16 16"
          id="IconChangeColor"
        >
          {" "}
          <path
            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
            id="mainIconPathAttribute"
          ></path>{" "}
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-pinterest"
          viewBox="0 0 16 16"
          id="IconChangeColor"
        >
          {" "}
          <path
            d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z"
            id="mainIconPathAttribute"
          ></path>{" "}
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-twitter"
          viewBox="0 0 16 16"
          id="IconChangeColor"
        >
          {" "}
          <path
            d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
            id="mainIconPathAttribute"
          ></path>{" "}
        </svg>
      </div>

      {/* 1st Conatiner - Image */}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          {Object.keys(productDetail).length > 0 ? (

            <Image
              className="w-11/12 h-84"
              src={image}
              alt="MaxImage"
              width={600}
              height={600}
              
            />
          ) : (
            <div className="text-center">
              <p>Loading....</p>
            </div>
          )}

          {Object.keys(productDetail).length > 0 && (
            <div className="mt-5 ml-2 flex flex-wrap gap-2">
              <Image
                onClick={()=>handleChangeImage(productDetail.images[1])}
                className="w-12 h-12 border-2 hover:border-orange-500 cursor-pointer"
                src={productDetail?.images[1]}
                alt="MaxImage"
                width={600}
                height={600}
              />
              <Image
                className="w-12 h-12 border-2 hover:border-orange-500 cursor-pointer"
                onClick={()=>handleChangeImage(productDetail.images[2])}
                src={productDetail?.images[2]}
                alt="MaxImage"
                width={600}
                height={600}
              />
              <Image
                className="w-12 h-12 border-2 hover:border-orange-500 cursor-pointer"
                onClick={()=>handleChangeImage(productDetail.images[3])}
                src={productDetail?.images[3]}
                alt="MaxImage"
                width={600}
                height={600}
              />
              <Image
                className="w-12 h-12 border-2 hover:border-orange-500 cursor-pointer"
                onClick={()=>handleChangeImage(productDetail.images[0])}
                src={productDetail?.images[0]}
                alt="MaxImage"
                width={600}
                height={600}
              />
            </div>
          )}
          <p className="text-gray-950 text-justify mr-8">
            {productDetail?.description}
          </p>
        </div>

        {/* 2nd Conatiner - Details */}
        <div className="w-full lg:w-1/3">
          <p className="text-4xl text-black font-medium p-0 m-0">
            {productDetail?.title}
          </p>
          <p className="text-gray-600 text-sm mt-3">SKU: 0011</p>
          <p className="mt-4 text-orange-500 flex gap-4 text-xl">
            <span className="line-through"> ${productDetail?.price}.00 </span>
            <span>${Math.ceil(productDetail?.price - (productDetail?.price * 10 / 100))}.00</span>
          </p>
          <div className="mt-5">
            <p>Color</p>
            <div className="flex gap-4 mt-2">
              <div className="w-5 h-5 rounded-full bg-red-500 hover:border-gray-500 border-2"></div>
              <div className="w-5 h-5 rounded-full bg-gray-300 hover:border-gray-500 border-2"></div>
              <div className="w-5 h-5 rounded-full bg-green-500 hover:border-gray-500 border-2"></div>
            </div>
          </div>
          <div className="mt-2">
            <p>Size</p>
            <div className="mt-2">
              <select className="w-72 text-gray-500 h-10 border-2 border-gray-300">
                <option>Select</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>X-Large</option>
                <option>2X-Large</option>
              </select>
            </div>
          </div>
          <div className="mt-2">
            <p>Quantity</p>
            <div className="mt-2">
              <input
                type="number"
                className="w-14 text-gray-500 border-2 border-gray-300 text-center"
                placeholder="1"
              />
            </div>
            <div className="mt-2">
              <div className="flex gap-2">
                <button
                  onClick={toggleCart}
                  className="w-11/12 border-2 border-orange-600 bg-orange-500 text-white py-1"
                >
                  Add to cart
                </button>
                <button className="border-2 px-2 text-orange-500 border-orange-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                    id="IconChangeColor"
                  >
                    {" "}
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                      id="mainIconPathAttribute"
                    ></path>{" "}
                  </svg>
                </button>
              </div>
              <button className="w-full mt-1 bg-gray-950 text-white py-1">
                Buy Now
              </button>
            </div>
            <div className="absolute top-80 mt-72 right-10 hidden lg:block">
              <div className="bg-black text-white border-2 border-white px-2 py-1">
                Lets Chat!
              </div>
            </div>
            <div className="mt-2 text-lg">
              <div
                className="flex items-center border-b-2 mb-2 border-gray-500 text-gray-500 cursor-pointer"
                onClick={toggleProductInfo}
              >
                <p className="mr-auto">PRODUCT INFO</p>
                <span>{productInfoVisible ? "-" : "+"}</span>
              </div>
              {productInfoVisible && (
                <div>
                  <p className="section-wrapper text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus, voluptate est corporis dolorum beatae eveniet
                    blanditiis, obcaecati, magni facere voluptates distinctio
                    mollitia fugiat rem. Eum quis ducimus odit laborum esse.
                  </p>
                </div>
              )}

              <div
                className="flex items-center border-b-2 mb-2 border-gray-500 text-gray-500 cursor-pointer"
                onClick={toggleRefundPolicy}
              >
                <p className="mr-auto">RETURN & REFUND POLICY</p>
                <span>{refundPolicyVisible ? "-" : "+"}</span>
              </div>
              {refundPolicyVisible && (
                <div className="flex flex-wrap">
                  <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro at obcaecati aliquid aliquam quisquam, eaque sapiente
                    quia fugiat. Totam vero exercitationem consequatur iste
                    provident, cupiditate minus fugiat sequi dolor ullam.
                  </p>
                </div>
              )}

              <div
                className="flex items-center border-b-2 mb-2 border-gray-500 text-gray-500 cursor-pointer"
                onClick={toggleShippingInfo}
              >
                <p className="mr-auto">SHIPPING INFO</p>
                <span>{shippingInfoVisible ? "-" : "+"}</span>
              </div>
              {shippingInfoVisible && (
                <div>
                  <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta dolor perspiciatis similique enim, nihil
                    reprehenderit. Iure, minus porro aut magni sit reiciendis
                    laborum sapiente eveniet quia voluptate? Rem, distinctio
                    vitae?
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 3rd Conatiner Bottom Images */}
      <div className="mt-2">
        <p className="text-center text-4xl mb-6 font-medium">
          Related Products
        </p>
        <ScrollImage id={productDetail.id}></ScrollImage>
      </div>
      {showCart && <Cart CloseCart={CloseCart}></Cart>}
    </div>
  );
}
