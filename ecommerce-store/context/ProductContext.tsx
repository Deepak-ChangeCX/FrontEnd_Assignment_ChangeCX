import React, { useEffect } from "react";
import { useState } from "react";
import AppContext from "./context";

const ProductContextProvider = ({children}:any)=>{

  const [login , setLogin] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("token")){
        setLogin(true)
    }else{
      setLogin(false)
    }
  },[])
    return(
        <AppContext.Provider value={{ login , setLogin}}>
            {children}
        </AppContext.Provider>
    )
}

export default ProductContextProvider