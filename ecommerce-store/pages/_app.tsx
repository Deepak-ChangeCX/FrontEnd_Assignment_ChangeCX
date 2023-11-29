import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ProductContextProvider from "@/context/ProductContext";
import ProductIdContextProvider from "@/context/ProductIdContext";
import CartContextProvider from "@/context/AddToCartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="m-4 md:m-10 mx-2 md:mx-20 max-w-full overflow-x-hidden">
      <ProductContextProvider>
        <ProductIdContextProvider>
          <CartContextProvider>
            <NavBar></NavBar>
            <Component {...pageProps} />
          </CartContextProvider>
        </ProductIdContextProvider>
      </ProductContextProvider>
      <Footer></Footer>
    </main>
  );
}
