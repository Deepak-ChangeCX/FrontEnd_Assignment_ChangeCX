import { useEffect, useState } from "react"
import ProductIdContext from "./ProductId"
const ProductIdContextProvider = ({children}:any)=>{
    const [product, setProduct] = useState({})

    const handleData = (data:any) => {
       setProduct(data);
      };

return(
    <ProductIdContext.Provider value={{state:{product},setProduct:setProduct , handleData:handleData}}>
        {children}
    </ProductIdContext.Provider>
)

}

export default ProductIdContextProvider