import Footer from "@/components/Utils/Footer";
import NavBar from "@/components/Utils/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ProductContextProvider from "@/context/ProductContext";
import ProductIdContextProvider from "@/context/ProductIdContext";
import {CartContextProvider} from "@/context/AddToCartContext";
import { ToastContextProvider } from "@/context/ToastContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="m-4 md:m-10 mx-2 md:mx-20 max-w-full overflow-x-hidden">
      <ToastContextProvider>
      <ProductContextProvider>
        {/* <ProductIdContextProvider> */}
              <CartContextProvider>
                <NavBar></NavBar>
                <Component {...pageProps} />
              </CartContextProvider>
        {/* </ProductIdContextProvider> */}
      </ProductContextProvider>
      </ToastContextProvider>
      <Footer></Footer>
    </main>
  );
}
