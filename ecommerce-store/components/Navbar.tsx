import { useContext, useState } from "react";
import Link from "next/link";
import AddToCartContext from "@/context/CartContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartvalue = useContext(AddToCartContext) as any
  const cartItems = cartvalue.state.cartItems

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-2 shadow">
      <div className="flex items-center gap-2">
        <div className="bg-black text-white p-2 font-medium">NOUS</div>
        <div className="mr-auto flex items-center">
          <span className="relative left-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
              id="IconChangeColor"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                id="mainIconPathAttribute"
              ></path>
            </svg>
          </span>
          <input
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md pl-8"
          />
        </div>
      </div>

      <div className="items-center mt-2 hidden lg:flex">
        <div className="px-4 py-2 hover:text-orange-500">
          <Link href="/">Shop All</Link>
        </div>

        <div className="px-4 py-2 hover:text-orange-500">
          {" "}
          <Link href="/Womenlistings">Women</Link>
        </div>
        <div className="px-4 py-2 hover:text-orange-500">
          <Link href="/Menlistings">Men</Link>
        </div>
        <div className="px-4 py-2 hover:text-orange-500">Sale</div>
        <div className="px-4 py-2 hover:text-orange-500">About</div>
        <div className="px-4 py-2 hover:text-orange-500">Contact</div>
        <div className="px-4 py-2 flex items-center hover:text-orange-500">
          <span>
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              id="IconChangeColor"
              height="46"
              width="24"
            >
              <path
                fill="currentColor"
                d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
                id="mainIconPathAttribute"
              ></path>
            </svg>
          </span>
          Log In
        </div>
        <div className="px-4 py-2 hover:text-orange-500 relative">
          <Link href="/Checkout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-shopping-bag"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <div className="absolute top-0 right-1 text-s font-bold bg-black w-5 h-5 text-orange-500 rounded-full text-center"><p className="relative bottom-1">{cartItems?.length}</p></div>
          </Link>
        </div>
      </div>

      <div className="lg:hidden">
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          onClick={toggleNavbar}
        >
          <svg
            className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <svg
            className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-4">
            <div className="px-4 py-2 hover:text-orange-500"><Link href="/">Shop All</Link></div>
            <div className="px-4 py-2 hover:text-orange-500"><Link href="/Womenlistings">Women</Link></div>
            <div className="px-4 py-2 hover:text-orange-500"><Link href="/Menlistings">Men</Link></div>
            <div className="px-4 py-2 hover:text-orange-500">Sale</div>
            <div className="px-4 py-2 hover:text-orange-500">About</div>
            <div className="px-4 py-2 hover:text-orange-500">Contact</div>
            <div className="px-4 py-2 flex items-center hover:text-orange-500">
              <span>
                <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  id="IconChangeColor"
                  height="46"
                  width="24"
                >
                  <path
                    fill="currentColor"
                    d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
                    id="mainIconPathAttribute"
                  ></path>
                </svg>
              </span>
              Log In
            </div>
            <div className="px-4 py-2 flex items-center hover:text-orange-500">
              <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-shopping-bag"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              </span>
              <Link href="/Checkout">
              Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
