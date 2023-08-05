import ToastContext from "@/context/ToastContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import OtpInput from "./OtpPage";
import Link from "next/link";
import LoadingSpinner from "../Utils/Spinner";
const URL = "http://localhost:9000"

const RegisterationPage = () => {
  const { toast } = useContext(ToastContext) as any;
  const [showPassword, setShowPassword] = useState(false);
  const [Loading , setLoading] = useState(false)
  const [otpPage, setOtpPage] = useState(false);

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    EmailId: "",
    PhoneNo: "",
    Password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const CallRequest = async()=>{
   await axios.post(`${URL}/api/v1/registration` , formData)
   .then((res)=>{
    console.log(res.data)
    setLoading(false)
    toast.success(res.data.message)
    setOtpPage(true);
   })
   .catch((e)=>{
    setLoading(false)
    console.log(e)
    toast.error(e.response.data.message)
   })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true)
      CallRequest()
    }
  };

  const validateForm = () => {
    // Basic client-side validation
    const { EmailId, PhoneNo, Password } = formData;

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const PhoneNoRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

    if (!emailRegex.test(EmailId)) {
      toast.error("Invalid Email Format");
      return false;
    } else if (!PhoneNoRegex.test(PhoneNo)) {
      toast.error("Invalid Mobile Format");
      return false;
    } else if (!passwordRegex.test(Password)) {
      toast.error(`Password must contain 8 Letters
                   1 UpperCase Word
                   1 Special Char
                   And Number`);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="mx-4 md:mx-20">
        {Loading && <LoadingSpinner></LoadingSpinner>}
        <div className="border-2 border-gray-500 rounded-lg shadow-lg m-auto p-6 w-full md:w-[400px] h-auto mt-10">
          {!otpPage ? (
            <>
              <div className="text-center text-3xl font-semibold mb-4 text-black-500">
                <h1>Create Account</h1>
              </div>
              <div>
                <p className="text-black-600 font-bold text-lg ">First Name:</p>
                <input
                  className="block w-full border-2 border-gray-500 py-2 px-2 rounded-lg text-black-800 mb-4"
                  type="text"
                  name="FirstName"
                  placeholder="FIRST NAME"
                  value={formData.FirstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="text-black-600 font-bold text-lg ">
                  Last Name(Optional):
                </p>
                <input
                  className="block border-2 border-gray-500 py-2 px-2 w-full rounded-lg text-black-800 mb-4"
                  type="text"
                  name="LastName"
                  placeholder="LAST NAME"
                  value={formData.LastName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="text-black-600 font-bold text-lg ">Email:</p>
                <input
                  className="block border-2 border-gray-500 py-2 px-2 w-full rounded-lg text-black-800 mb-4"
                  type="email"
                  name="EmailId"
                  placeholder="EMAIL ADDRESS"
                  value={formData.EmailId}
                  onChange={handleInputChange}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  required
                />
              </div>
              <div>
                <p className="text-black-600 font-bold text-lg ">
                  Mobile Number:
                </p>
                <input
                  className="block border-2 border-gray-500 py-2 px-2 w-full rounded-lg text-black-800 mb-4"
                  type="tel"
                  name="PhoneNo"
                  placeholder="MOBILE NUMBER"
                  value={formData.PhoneNo}
                  onChange={handleInputChange}
                  pattern="[0-9]{10}"
                  title="Mobile number must be 10 digits long and contain only numeric characters"
                  required
                />
              </div>
              <div className="relative">
                <p className="text-black-600 font-bold text-lg ">Password:</p>
                <input
                  className="block border-2 border-gray-500 py-2 px-2 w-full rounded-lg text-black-800 mb-4"
                  type={!showPassword ? "password" : "text"}
                  name="Password"
                  placeholder="PASSWORD"
                  value={formData.Password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  className="absolute top-10 right-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                      id="IconChangeColor"
                    >
                      {" "}
                      <path
                        d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                        id="mainIconPathAttribute"
                        fill="#737373"
                      ></path>{" "}
                      <path
                        d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                        id="mainIconPathAttribute"
                        fill="#737373"
                      ></path>{" "}
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-eye-slash-fill"
                      viewBox="0 0 16 16"
                      id="IconChangeColor"
                    >
                      {" "}
                      <path
                        d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                        id="mainIconPathAttribute"
                        fill="#737373"
                      ></path>{" "}
                      <path
                        d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                        id="mainIconPathAttribute"
                        fill="#737373"
                      ></path>{" "}
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-center">
                <button
                  className="border-2 border-orange-500 px-6 py-2 rounded-lg font-bold hover:bg-orange-500 hover:text-white"
                  onClick={(e) => handleSubmit(e)}
                >
                  SIGN UP
                </button>
              </div>
            </>
          ) : (
            <form>
              <div className="text-center text-3xl font-semibold mb-4 text-black-500">
                <h1>Verify OTP</h1>
              </div>
              <OtpInput email={formData.EmailId} ></OtpInput>
            </form>
          )}
          <p className="text-center underline mt-5 hover:text-orange-500 cursor-pointer">
            <Link href="/">Already have Account?</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterationPage;
