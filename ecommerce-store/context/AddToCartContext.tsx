import { useEffect, useState } from "react";
import AddToCartContext from "./CartContext";

const CartContextProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const IncreaseQty = (id: any) => {
    setCartItems((prevProducts: any) => {
      const updatedProducts = prevProducts.map((product: any) => {
        if (product.id === id) {
          return {
            ...product,
            qty: product.qty + 1,
          };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  const DecreseQty = (id: any) => {
    setCartItems((prevProducts: any) => {
      const updatedProducts = prevProducts
        .map((product: any) => {
          if (product.id === id) {
            return {
              ...product,
              qty: product.qty - 1,
            };
          }
          return product;
        })
        .filter((items: any) => items.qty !== 0);
      return updatedProducts;
    });
  };

  useEffect(() => {
    let newTotal = 0;
    cartItems.forEach((item:any) => {
      newTotal += Math.ceil(item.price - item.price * 10 / 100) * item.qty;
    });
    setTotal(newTotal);
  }, [cartItems]);

  const EmptyCart = ()=>{
    if(cartItems.length >= 1){
      alert("Thanks For Shopping Order Placed Successfully")
    }else{
      alert("Cart is Empty")
    }
    setCartItems([])
    setTotal(0)
    
  }

  return (
    <AddToCartContext.Provider
      value={{
        state: { cartItems, total },
        setCartItems: setCartItems,
        setTotal: setTotal,
        IncreaseQty: IncreaseQty,
        DecreseQty: DecreseQty,
        EmptyCart:EmptyCart,
      }}
    >
      {children}
    </AddToCartContext.Provider>
  );
};

export default CartContextProvider;
