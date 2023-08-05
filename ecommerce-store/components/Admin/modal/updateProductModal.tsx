import ToastContext from "@/context/ToastContext";
import axios from "axios";
import { useState, useContext } from "react";
const URL = "http://localhost:9000";

const UpdateModal = ({ product, closeModal, CallProductRequest }: any) => {
  const { toast } = useContext(ToastContext) as any;
  const [formData, setFormData] = useState({
    title: product.title || "",
    brand: product.brand || "",
    images: product.images || "",
    InStock: product.InStock || "",
    bestSeller: product.bestSeller || false,
    category: product.category || "",
    price: product.price || "",
    IsDiscount: product.IsDiscount || false,
    discountPercent: product.discountPercent || "",
    description: product.description || "",
  });

  const CallRequest = () => {
    console.log(formData)
    axios
      .put(
        `${URL}/api/v1/products/update/${product._id}`,
        { title: formData.title ,
        brand: formData.brand ,
        images: Array.isArray(formData.images)? formData.images : formData.images.split(","), 
        InStock: formData.InStock, 
        bestSeller: formData.bestSeller,
        category: formData.category ,
        price: formData.price ,
        IsDiscount: formData.IsDiscount,
        discountPercent: formData.discountPercent, 
        description: formData.description  },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        toast.success("Product Updated Success");
        closeModal();
        CallProductRequest();
        // console.log(res.data.products)
        // console.log(res.data)
      })
      .catch((e) => {
        closeModal();
        toast.error(e.response.data.message);
      });
  };

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;

    // If the input type is a radio button and it is checked, set the value as a boolean true
    const newValue =
      type === "radio" && checked
        ? true
        : type === "checkbox"
        ? checked
        : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here, you can access the form data in the `formData` state and perform any necessary actions like sending the data to a backend API or performing local state updates.
    // console.log(formData);
    CallRequest();
  };

  return (
    <div className="w-1/2 left-72 shadow-xl rounded-lg text-white h-96 bg-gray-700 fixed z-20">
      <div className="text-right mr-4 text-2xl">
        <button onClick={closeModal}>X</button>
      </div>
      <form className="flex flex-wrap" onSubmit={handleSubmit}>
        <div className="px-4 py-2">
          <div className="text-2xl">Title</div>
          <input
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="h-10 rounded-lg px-2 text-black"
          />
        </div>
        <div className="px-4 py-2">
          <div className="text-2xl">Brand</div>
          <input
            placeholder="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="h-10 rounded-lg px-2 text-black"
          />
        </div>
        <div className="px-4 py-2">
          <div className="text-2xl">Images</div>
          <input
            name="images"
            placeholder="ImageLinks, Separated"
            value={formData.images}
            onChange={handleChange}
            className="h-10 rounded-lg px-2 text-black"
          />
        </div>
        <div className="px-4 py-2">
          <div className="text-2xl">InStock</div>
          <input
            type="number"
            name="InStock"
            placeholder="1 to 100"
            value={formData.InStock}
            onChange={handleChange}
            className="h-10 rounded-lg px-2 text-black"
          />
        </div>
        <div className="px-4 py-2">
          <div className="text-2xl">Best Seller</div>
          <input
            type="radio"
            id="bestSellerYes"
            name="bestSeller"
            value={true as any}
            checked={formData.bestSeller === true}
            onChange={handleChange}
          />
          <label htmlFor="bestSellerYes" className="text-2xl px-2">
            Yes
          </label>
          <input
            type="radio"
            id="bestSellerNo"
            name="bestSeller"
            value={false as any}
            checked={formData.bestSeller === false}
            onChange={handleChange}
          />
          <label htmlFor="bestSellerNo" className="text-2xl px-2">
            NO
          </label>
        </div>
        <div className="px-4 py-2">
          <div className="text-2xl">Category</div>
          <input
            value={formData.category}
            onChange={handleChange}
            name="category"
            placeholder="Mens/Womens"
            className="h-10 rounded-lg px-2 text-black"
          />
        </div>
        <div className="px-4 py-2">
          <div className="text-2xl">Price</div>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="$0.000"
            type="number"
            className="h-10 rounded-lg px-2 text-black"
          />
        </div>
        <div className="px-4 py-2">
          <div className="text-2xl">Discount</div>
          <input
            type="radio"
            id="IsDiscountYes"
            name="IsDiscount"
            value={true as any}
            checked={formData.IsDiscount === true}
            onChange={handleChange}
          />
          <label htmlFor="IsDiscountYes" className="text-2xl px-2">
            Yes
          </label>
          <input
            type="radio"
            id="IsDiscountNo"
            name="IsDiscount"
            value={false as any}
            checked={formData.IsDiscount === false}
            onChange={handleChange}
          />
          <label htmlFor="IsDiscountNo" className="text-2xl px-2">
            NO
          </label>
        </div>
        <div className="px-4 py-2">
          <div className="text-2xl">DiscountPercent</div>
          <input
            placeholder="5/10/15"
            name="discountPercent"
            value={formData.discountPercent}
            onChange={handleChange}
            className="h-10 rounded-lg px-2 text-black"
          />
        </div>
        <div className="px-4 py-2">
          <div className="text-2xl">Description</div>
          <input
            placeholder="ABCXYZ"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="h-10 rounded-lg px-2 text-black"
          />
        </div>
        <div className="px-4 py-4 text-2xl">
          <button
            type="submit"
            className="border-2 px-2 py-2 rounded-lg shadow-lg hover:bg-green-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateModal;
