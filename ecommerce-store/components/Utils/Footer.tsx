export default function Footer() {
  return (
    <>
    <div className='flex flex-col sm:flex-row bg-gray-950 mt-10 sm:mt-20 text-gray-300 justify-center p-6'>
      <div className='flex flex-col sm:flex-row sm:mr-10'>
        <div className='mr-10 mt-3'>
          {/* <h3 className='font-medium text-white mb-2'>Shop</h3> */}
          <ul className='space-y-2'>
            <li>Shop All</li>
            <li>About</li>
            <li>Contact</li>
            <li>Stocklists</li>
          </ul>
        </div>
        <div className='mr-10 mt-3'>
          {/* <h3 className='font-medium text-white mb-2'>FAQ</h3> */}
          <ul className='space-y-2'>
            <li>FAQ</li>
            <li>Shipping & Returns</li>
            <li>Store Policy</li>
            <li>Payment Methods</li>
          </ul>
        </div>
        <div>
          {/* <h3 className='font-medium text-white mb-2'>Follow Us</h3> */}
          <ul className='space-y-2 mt-3'>
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Facebook</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
      <div className='mt-1'>
        <h3 className='font-medium text-white mb-2'>Join our mailing list</h3>
        <p className='text-sm'>and get 10% off</p>
        <div className='mt-5'>
          <input
            type='email'
            placeholder='Enter Your Email here*'
            className='block border-2 px-2 py-1 border-white mb-2 bg-gray-950'
          />
          <button className='border-2 bg-orange-500 px-11 py-1 text-white'>
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
    <p>&copy; 2023 by NOUS Powered and Secured by WIX</p>
    </>
  );
}
