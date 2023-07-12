import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import AppContext from "./context";

const ProductContextProvider = ({children}:any)=>{

  const [products, setProducts] = useState<Product[]>([]);
    type Product = {
        brand: string;
        price: number;
        images: string[];
      };
    
      useEffect(() => {
        async function fetchData() {
          try {
            const [mensResponse, womensResponse] = await Promise.all([
              axios.get("https://dummyjson.com/products/category/mens-shirts"),
              axios.get("https://dummyjson.com/products/category/womens-dresses"),
            ]);
    
            setProducts([
              ...mensResponse.data.products,
              ...womensResponse.data.products,
            ]);
          } catch (error) {
            alert(error);
          }
        }
    
        fetchData();
      }, []);
    return(
        <AppContext.Provider value={products}>
            {children}
        </AppContext.Provider>
    )
}

export default ProductContextProvider