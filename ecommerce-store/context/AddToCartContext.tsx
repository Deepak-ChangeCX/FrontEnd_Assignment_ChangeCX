import { useEffect, useState } from "react";
import AddToCartContext from "./CartContext";

const CartContextProvider = ({children}:any)=>{
 const [cartItems , setCartItems] = useState([])
 const [total , setTotal] = useState(0)

 return(
    <AddToCartContext.Provider value={{state:{cartItems , total} , setCartItems:setCartItems , setTotal:setTotal}}>
        {children}
    </AddToCartContext.Provider>
 )
}

export default CartContextProvider;