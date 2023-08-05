import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import AppContext from "@/context/context";
import ProductIdContext from "@/context/ProductId";
import Link from "next/link";
import axios from "axios";
import ToastContext from "@/context/ToastContext";
import { useRouter } from "next/router";
const URL = "http://localhost:9000";

export default function ScrollImage({ relatedProducts }:any) {
  const ImageContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter()
  // const {toast} = useContext(ToastContext) as any;
  // const value = useContext(ProductIdContext) as any;
  // const {products} = useContext(AppContext) as any;
  const handleNavigation =(id:any)=>{
  router.push(`/Product?id=${id}`)
  }
  // const [relatedProducts, setRelatedProducts] = useState([]);

  // useEffect(() => {
  //   axios.get(`${URL}/api/v1/products/category/${category}`, {
  //     headers: { authorization: localStorage.getItem("token") },
  //   })
  //   .then((res)=>{
  //     // console.log("hit")
  //     // console.log(res.data.products)
  //     setRelatedProducts(res.data.products)
  //   })
  //   .catch((e)=>{
  //     toast.error(e.response.data.message)
  //   })
    
  // }, []);

  const scrollLeft = () => {
    if (ImageContainerRef.current) {
      ImageContainerRef.current.scrollBy({
        left: -260,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (ImageContainerRef.current) {
      ImageContainerRef.current.scrollBy({
        left: 260,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <div className="text-4xl hidden lg:block">
        <button className="absolute top-20 -left-5" onClick={scrollLeft}>
          &lt;
        </button>
        <button className="absolute top-20 -right-5" onClick={scrollRight}>
          &gt;
        </button>
      </div>
      <div
        className="overflow-x-auto whitespace-nowrap py-2 px-2 image-cont w-full h-1/4"
        ref={ImageContainerRef}
      >
        {relatedProducts?.map((items:any, idx:any) => (
          <div onClick={()=>handleNavigation(items._id)}
            className="h-full w-full object-cover lg:h-1/4 lg:w-[15em] mr-4 inline-block shadow-lg"
            key={idx}
          >
            {/* <Link href="/Product"> */}
              <Image
                className="w-full h-80 lg:w-64 lg:h-64"
                src={items.images[0]}
                alt="Image1"
                width={600}
                height={600}
              />
            {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}
