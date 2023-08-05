import ToastContext from "@/context/ToastContext";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import UpdateModal from "./modal/updateProductModal";
import AddModal from "./modal/addProductModal";
import Image from "next/image";
const URL = "http://localhost:9000";

const AllProductsPage = () => {
  const router = useRouter();
  const { toast } = useContext(ToastContext) as any;
  const [AllProduct, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [Updatemodal, showModal] = useState(false);
  const [ShowAddProductModal, setAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const CallRequest = () => {
    axios
      .get(`${URL}/api/v1/user/products/dashboard?page=${page}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setAllProducts(res.data.products);

        // console.log(res.data)
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  const handleNavigation = (id: any) => {
    router.push(`/Product?id=${id}`);
  };
  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      router.push("/Home");
      toast.error("Not a Admin User");
    } else {
      CallRequest();
    }
  }, [page]);

  const handleDelete = (id: any) => {
    axios
      .delete(`${URL}/api/v1/products/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        // setAllProducts(res.data.user)

        toast.success("Product Removed");
        CallRequest();
        // console.log(res.data)
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
  const handleUpdate = (id: any) => {
    const productToUpdate = AllProduct.find(
      (item: any) => item._id === id
    ) as any;
    setSelectedProduct(productToUpdate);
    // console.log(productToUpdate);
    showModal(true);
  };

  const handlePage = (mode: any) => {
    switch (mode) {
      case "next":
        if (AllProduct.length === 6) {
          return setPage(page + 1);
        }
        break;
      case "back": {
        if (page > 1) {
          return setPage(page - 1);
        }
        break;
      }
      default:
        break;
    }
  };

  const closeModal = () => {
    showModal(false);
    setAddModal(false);
  };

  return (
    <>
      {Updatemodal && (
        <UpdateModal
          closeModal={closeModal}
          product={selectedProduct}
          CallProductRequest={CallRequest}
        ></UpdateModal>
      )}
      {ShowAddProductModal && (
        <AddModal
          closeModal={closeModal}
          CallAddRequest={CallRequest}
        ></AddModal>
      )}
      <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-red-900 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex">
                  <h3 className="font-semibold text-lg text-white mr-auto">
                    All Users
                  </h3>
                  <button
                    onClick={() => setAddModal(true)}
                    className="bg-green-500 px-4 py-2 rounded-lg shadow-md"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto h-auto ">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Product ID
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Image
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Title
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Stock
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Update
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Delete
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      View
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {AllProduct?.map((items: any, idx: any) => (
                    <tr
                      key={idx}
                      className="border-b-2 border-pink-950 cursor-pointer hover:bg-pink-950"
                    >
                      <td className="px-6 py-4">
                        PRDT{items?._id?.split("").slice(20, 24).join("")}
                      </td>
                      <td className="px-6">
                        <Image
                          width={40}
                          height={40}
                          alt={items.brand}
                          className="w-20 h-20"
                          src={items?.images[0]}
                        />
                      </td>
                      <td className="px-6">{items?.title}</td>
                      <td className="px-6">{items?.InStock}</td>
                      <td className="px-6">
                        <button
                          onClick={() => handleUpdate(items._id)}
                          className="px-2 py-2 bg-yellow-500 rounded-lg shadow-lg"
                        >
                          Update
                        </button>
                      </td>
                      <td className="px-6">
                        <button
                          onClick={() => handleDelete(items._id)}
                          className="px-2 py-2 bg-red-500 rounded-lg shadow-lg"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-6">
                        <button
                          onClick={() => handleNavigation(items._id)}
                          className="px-2 py-2 bg-blue-500 rounded-lg shadow-lg"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex m-auto px-2 py-2 gap-4">
              <button onClick={() => handlePage("back")}>&lt;</button>
              {page}
              <button onClick={() => handlePage("next")}>&gt;</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllProductsPage;
