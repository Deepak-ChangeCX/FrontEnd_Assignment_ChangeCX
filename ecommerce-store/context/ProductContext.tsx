import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import AppContext from "./context";

const ProductContextProvider = ({children}:any)=>{

  const [products , setProduct] = useState([
    {id:1 , name:"Royal Enfield Pure Motorcycling Sea Green T-Shirt" , price:1000 , qty:1 ,images:["https://m.media-amazon.com/images/I/619JCi17BQL._SX679_.jpg" ,"https://m.media-amazon.com/images/I/61ZD2D7uCyL._SX679_.jpg" , "https://m.media-amazon.com/images/I/710nCZ4Y0uL._SX679_.jpg" ,"https://m.media-amazon.com/images/I/51iehYnRsNL._SX679_.jpg"], category:"mens-shirts" , bestSeller:false},
    {id:2 , name:"Allen Solly Men Polo" , price:1300 , qty:1 ,images:["https://m.media-amazon.com/images/I/71eUwDk8z+L._UY879_.jpg","https://m.media-amazon.com/images/I/71mh8ZJZFuL._UY879_.jpg","https://m.media-amazon.com/images/I/71vSLpVgZpL._UY879_.jpg","https://m.media-amazon.com/images/I/71J8pbcn8WL._UY879_.jpg"], category:"mens-shirts" , bestSeller:true},
    {id:3 , name:"Symbol Men's Disney Oversized T-Shirt" , price:1899 , qty:1 ,images:["https://m.media-amazon.com/images/I/71-OmAiWYRL._UY879_.jpg","https://m.media-amazon.com/images/I/71XS2BeayWL._UY879_.jpg","https://m.media-amazon.com/images/I/71fX5bYBh0L._UY879_.jpg","https://m.media-amazon.com/images/I/81zVIrQx9vL._UY879_.jpg"], category:"mens-shirts" , bestSeller:false},
    {id:4 , name:"EYEBOGLER Men's Trendy Full Sleeves Round Neck Regular Fit Striped T-Shirt" , price:100 , qty:1 ,images:["https://m.media-amazon.com/images/I/518CeQCpaYL._UX679_.jpg","https://m.media-amazon.com/images/I/51ih2z6ARQL._UX679_.jpg","https://m.media-amazon.com/images/I/81gIgTQ60KL._UX679_.jpg","https://m.media-amazon.com/images/I/81+4kqbFVvL._UX679_.jpg"], category:"mens-shirts" , bestSeller:true},
    {id:5 , name:"EYEBOGLER Round Neck Full Sleeve Striped T Shirt for Men" , price:1690 , qty:1 ,images:["https://m.media-amazon.com/images/I/61PgOZ-IH0L._UX679_.jpg","https://m.media-amazon.com/images/I/516n3XO62LL._UX679_.jpg","https://m.media-amazon.com/images/I/516n3XO62LL._UX679_.jpg","https://m.media-amazon.com/images/I/516n3XO62LL._UX679_.jpg"], category:"mens-shirts" , bestSeller:true},
    {id:6 , name:"Veirdo Oversized Cotton Animal Print Multicolour Crew Neck T-Shirt" , price:1300 , qty:1 ,images:["https://m.media-amazon.com/images/I/61r0PYFOONL._UX679_.jpg","https://m.media-amazon.com/images/I/61Nkc5-qhzL._UX679_.jpg","https://m.media-amazon.com/images/I/61zYtZT0S4L._UX679_.jpg","https://m.media-amazon.com/images/I/619hg9GR-FL._UX679_.jpg"], category:"mens-shirts" , bestSeller:true},
    {id:7 , name:"LookMark Men's Stylish Cotton Blend Printed Striped Polo Tshirt" , price:1500 , qty:1 ,images:["https://m.media-amazon.com/images/I/41cdvdRUpEL.jpg","https://m.media-amazon.com/images/I/41cdvdRUpEL.jpg","https://m.media-amazon.com/images/I/41cdvdRUpEL.jpg","https://m.media-amazon.com/images/I/41--VmJbNSL.jpg"], category:"mens-shirts" , bestSeller:true},
    {id:8 , name:"EYEBOGLER Regular Printed T-Shirt" , price:1040 , qty:1 ,images:["https://m.media-amazon.com/images/I/61GmEjXOdzL._UY879_.jpg","https://m.media-amazon.com/images/I/616SFW+eSmL._UX679_.jpg","https://m.media-amazon.com/images/I/616SFW+eSmL._UX679_.jpg","https://m.media-amazon.com/images/I/616SFW+eSmL._UX679_.jpg"], category:"mens-shirts" , bestSeller:false},
    {id:9 , name:"Urbano Fashion Men's Printed Full Sleeve Slim Fit Cotton T-Shirt" , price:1050 , qty:1 ,images:["https://m.media-amazon.com/images/I/61bDoqhvEPL._UX679_.jpg","https://m.media-amazon.com/images/I/61bDoqhvEPL._UX679_.jpg","https://m.media-amazon.com/images/I/61bDoqhvEPL._UX679_.jpg","https://m.media-amazon.com/images/I/615cJXqUkhL._UX679_.jpg"], category:"mens-shirts" , bestSeller:false},
    {id:10, name:"Tfortees Black Cotton Printed Tshirt" , price:1500 , qty:1 ,images:["https://m.media-amazon.com/images/I/512s8o2H6bL._UX679_.jpg","https://m.media-amazon.com/images/I/41mkYZrVW3L._UY879_.jpg","https://m.media-amazon.com/images/I/512s8o2H6bL._UX679_.jpg","https://m.media-amazon.com/images/I/41mkYZrVW3L._UY879_.jpg"], category:"mens-shirts" , bestSeller:true},
    {id:11 , name:"Symbol Women's Crepe Bodycon Midi Dress" , price:2100 , qty:1 ,images:["https://m.media-amazon.com/images/I/61C91ZhnsGL._UY879_.jpg","https://m.media-amazon.com/images/I/61C91ZhnsGL._UY879_.jpg","https://m.media-amazon.com/images/I/71BaWCWi6vL._UY879_.jpg","https://m.media-amazon.com/images/I/61fm5QISIdL._UY879_.jpg"], category:"women-dress" , bestSeller:false},
    {id:12 , name:"BIBA Women Dress" , price:4100 , qty:1 ,images:["https://m.media-amazon.com/images/I/71SaYnXNgpL._UX679_.jpg","https://m.media-amazon.com/images/I/71d8jMonUYL._UX679_.jpg","https://m.media-amazon.com/images/I/71eZXVX83SL._UX679_.jpg","https://m.media-amazon.com/images/I/71rcaMcDs7L._UX679_.jpg"], category:"women-dress" , bestSeller:true},
    {id:13 , name:"RARE Women Casual Dresss" , price:5100 , qty:1 ,images:["https://m.media-amazon.com/images/I/51llet9Ww4L._UY879_.jpg","https://m.media-amazon.com/images/I/51cLmk2SNWL._UY879_.jpg","https://m.media-amazon.com/images/I/51WAstTRPML._UY879_.jpg","https://m.media-amazon.com/images/I/51llet9Ww4L._UY879_.jpg"], category:"women-dress" , bestSeller:true},
    {id:14 , name:"Calvin Klein Women's A-line Dress with Collared Neck" , price:7100 , qty:1 ,images:["https://m.media-amazon.com/images/I/81Z6gxGvO-L._UY879_.jpg","https://m.media-amazon.com/images/I/81BqKdFhX6L._UY879_.jpg","https://m.media-amazon.com/images/I/81Z6gxGvO-L._UY879_.jpg","https://m.media-amazon.com/images/I/81BqKdFhX6L._UY879_.jpg"], category:"women-dress" , bestSeller:true},
    {id:15 , name:"ishin Women's Cotton Above Knee Length A-Line Indo Western Dress" , price:9100 , qty:1 ,images:["https://m.media-amazon.com/images/I/61gUUqzWgRS._UY879_.jpg","https://m.media-amazon.com/images/I/61SpWZlRqSL._UY879_.jpg","https://m.media-amazon.com/images/I/61fjwGnEnUL._UY879_.jpg","https://m.media-amazon.com/images/I/61kJS2fBbHL._UY879_.jpg"], category:"women-dress" , bestSeller:true},
    {id:16 , name:"Selvia Women Suit - Dress Set" , price:1100 , qty:1 ,images:["https://m.media-amazon.com/images/I/41Z5LwyIhCL.jpg","https://m.media-amazon.com/images/I/41Gkxnu4KfL.jpg","https://m.media-amazon.com/images/I/41EXD2VPkVL.jpg","https://m.media-amazon.com/images/I/51JdT1VtEyL.jpg"], category:"women-dress" , bestSeller:true},
    {id:17 , name:"ADDYVERO Fold Pleated Bodycon Dress" , price:2100 , qty:1 ,images:["https://m.media-amazon.com/images/I/61H839LrcML._UX679_.jpg","https://m.media-amazon.com/images/I/61X6dRd5xsL._UX679_.jpg","https://m.media-amazon.com/images/I/51I4XfM+dcL._UX679_.jpg","https://m.media-amazon.com/images/I/51I4XfM+dcL._UX679_.jpg"], category:"women-dress" , bestSeller:false},
    {id:18 , name:"Harpa Women's A-Line Maxi Dress" , price:1300 , qty:1 ,images:["https://m.media-amazon.com/images/I/61xo-pk0r4L._UX679_.jpg","https://m.media-amazon.com/images/I/61Pipj4G0vL._UX679_.jpg","https://m.media-amazon.com/images/I/61BQtJ9LgnL._UX679_.jpg","https://m.media-amazon.com/images/I/61sPUeP9rVL._UX679_.jpg"], category:"women-dress" , bestSeller:true},
    {id:19 , name:"BIBA Women Dress" , price:1400 , qty:1 ,images:["https://m.media-amazon.com/images/I/71F9YL0k2QL._UX679_.jpg","https://m.media-amazon.com/images/I/71gRjYFYeoL._UX679_.jpg","https://m.media-amazon.com/images/I/717V3+zlU2L._UX679_.jpg","https://m.media-amazon.com/images/I/71Dt1YpalTL._UX679_.jpg"], category:"women-dress" , bestSeller:false},
    {id:20 , name:"RARE Women Casual Dress" , price:1700 , qty:1 ,images:["https://m.media-amazon.com/images/I/61qHZ25pJ-L._UY879_.jpg","https://m.media-amazon.com/images/I/61nF82AyKwL._UY879_.jpg","https://m.media-amazon.com/images/I/61XnNCLcS9L._UY879_.jpg","https://m.media-amazon.com/images/I/61oASoRZK+L._UY879_.jpg"], category:"women-dress" , bestSeller:true},
  ])

  // const [products, setProducts] = useState<Product[]>([]);
  //   type Product = {
  //       brand: string;
  //       price: number;
  //       images: string[];
  //     };
    
  //     useEffect(() => {
  //       async function fetchData() {
  //         try {
  //           const [mensResponse, womensResponse] = await Promise.all([
  //             axios.get("https://dummyjson.com/products/category/mens-shirts"),
  //             axios.get("https://dummyjson.com/products/category/womens-dresses"),
  //           ]);
    
  //           setProducts([
  //             ...mensResponse.data.products,
  //             ...womensResponse.data.products,
  //           ]);
  //         } catch (error) {
  //           alert(error);
  //         }
  //       }
    
  //       fetchData();
  //     }, []);
    return(
        <AppContext.Provider value={{products , setProduct}}>
            {children}
        </AppContext.Provider>
    )
}

export default ProductContextProvider