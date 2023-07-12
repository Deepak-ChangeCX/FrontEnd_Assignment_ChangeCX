import { useEffect, useState } from "react"
import ProductIdContext from "./ProductId"
const ProductIdContextProvider = ({children}:any)=>{
    const [product, setProduct] = useState({})

return(
    <ProductIdContext.Provider value={{state:{product},setProduct:setProduct}}>
        {children}
    </ProductIdContext.Provider>
)

}

export default ProductIdContextProvider