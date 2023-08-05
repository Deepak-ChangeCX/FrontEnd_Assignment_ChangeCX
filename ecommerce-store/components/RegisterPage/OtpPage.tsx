import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import ToastContext from '@/context/ToastContext';
import { useRouter } from 'next/router';
import LoadingSpinner from '../Utils/Spinner';
const URL = "http://localhost:9000"

const OtpInput = ({email}:any) => {
  const router = useRouter();
  const [Loading , setLoading] = useState(false)
  const {toast} = useContext(ToastContext) as any
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  const CallRequest = async()=>{
    await axios.patch(`${URL}/api/v1/verify-otp` , {email:email , otp:otp.join("")})
    .then((res)=>{
    //  console.log(res.data)
    setLoading(false)
     toast.success(res.data.message);
     router.push("/")
    })
    .catch((e)=>{
      setLoading(false)
     toast.error(e.response.data.message)
    })
   }

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    CallRequest()
    // console.log(otp.join(''));
  };

  const handleOtpChange = (index:any, value:any) => {
   
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
      if (index < inputsRef.current.length - 1 && value !== '') {
        inputsRef.current[index + 1].focus()
      }
    
  };

  const handleKeyDown = (index:any, e:any) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = '';
        return newOtp;
      });
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div>
      {Loading && <LoadingSpinner></LoadingSpinner>}
      <div className='flex gap-4 justify-center my-10'>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            className='w-10 h-10 border-2 border-gray-500 text-center text-2xl rounded-md'
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            inputMode="numeric"
            ref={(ref) => (inputsRef.current[index] = ref)}
          />
        ))}
      </div>
      <div className="text-center">
                <button
                  className="border-2 border-orange-500 px-6 py-2 rounded-lg font-bold hover:bg-orange-500 hover:text-white"
                  onClick={(e) => handleOtpSubmit(e)}
                >
                  Verify
                </button>
              </div>
    </div>
  );
};

export default OtpInput;
