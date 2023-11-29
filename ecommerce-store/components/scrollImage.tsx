import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import AppContext from "@/context/context";
import ProductIdContext from "@/context/ProductId";
import Link from "next/link";

export default function ScrollImage({ category }:any) {
  const ImageContainerRef = useRef<HTMLDivElement>(null);
  const value = useContext(ProductIdContext) as any;
  const {products} = useContext(AppContext) as any;
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {

    setRelatedProducts(products.filter((items:any) => items.category === category ));
  }, [products, category]);

  const handleData = (data:any) => {
    value.setProduct(data);
  };

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
        {relatedProducts?.map((items:any, idx) => (
          <div
            className="h-full w-full object-cover lg:h-1/4 lg:w-[15em] mr-4 inline-block shadow-lg"
            key={idx}
          >
            <Link href="/Product">
              <Image
                onClick={() => handleData(items)}
                className="w-full h-80 lg:w-64 lg:h-64"
                src={items.images[0]}
                alt="Image1"
                width={600}
                height={600}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
