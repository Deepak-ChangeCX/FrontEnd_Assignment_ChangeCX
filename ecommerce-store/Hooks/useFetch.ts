import axios from "axios"
import { useState , useEffect } from "react";

const useFetch = (url) =>{
    const [products , setProducts] = useState([])
    const [loading , setLoading] = useState(true);
    const [err , setErr] = useState(null);

    useEffect(()=>{
        axios.get(url)
        .then((res)=>{
            setProducts(res.data.products)
        })
        .catch((e)=>{
            setErr(e)
        })
        .finally(()=>{
            setLoading(false)
        })

    },[url])
return {products , loading , err}
}
export default useFetch