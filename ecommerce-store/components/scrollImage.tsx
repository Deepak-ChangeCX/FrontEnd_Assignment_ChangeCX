import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import AppContext from "@/context/context";
import ProductIdContext from "@/context/ProductId";
import Link from "next/link";

export default function ScrollImage({ id }:any) {
  const ImageContainerRef = useRef<HTMLDivElement>(null);
  const value = useContext(ProductIdContext) as any;
  const Products = useContext(AppContext) as any;
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(Products.filter((items:any) => items.id !== id));
  }, [Products, id]);

  const handleData = (data:any) => {
    value.setProduct(data);
  };

  const scrollLeft = () => {
    if (ImageContainerRef.current) {
      ImageContainerRef.current.scrollBy({
        left: -220,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (ImageContainerRef.current) {
      ImageContainerRef.current.scrollBy({
        left: 220,
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
        {relatedProducts?.map((items:any, idx) => (
          <div
            className="h-full w-full object-cover lg:h-1/4 lg:w-[13em] mr-4 inline-block"
            key={idx}
          >
            <Link href="/Product">
              <Image
                onClick={() => handleData(items)}
                className="w-full h-80 lg:w-60 lg:h-60"
                src={items.images[0]}
                alt="Image1"
                width={400}
                height={400}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
