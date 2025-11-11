import React, { useState } from 'react'

import "./styles/UserLoginRegisterForm.scss"

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { useMessage } from '../../context/messageContext';

const UserLoginRegisterForm = () => {

  let [openFormLogin, setOpenFormLogin] = useState(true)

  let [showPassword, setShowPassword] = useState(false)


  let { triggerMessage } = useMessage()

  const handleLoginFormSubmit = (e) => {
    try {
      e.preventDefault()
      triggerMessage("success", "successfully logedIn ! redirecting to dashboard.", true)
    } catch (err) {
      triggerMessage("danger", "successfully logedIn ! redirecting to dashboard.", true)
    }
  }

  return (
    <div className='login-register-form'>
      <div className='content'>
        <div className='login-register-section shadow-lg rounded overflow-hidden'>
          <div className='register'>

            <form className='h-full flex flex-col justify-center p-5 gap-3'>
              <h1 className='text-2xl font-bold'>Create New <span className='text-primary'>Account</span></h1>
              <div className='flex gap-3'>
                <div className='grow'>
                  <div>
                    <span className='opacity-70'>Name</span>
                  </div>
                  <input type="text" id="name" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Name" required />
                </div>
                <div className='grow'>
                  <div>
                    <span className='opacity-70'>Phone</span>
                  </div>
                  <input type="tel" id="phone" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Phone" required />
                </div>
              </div>
              <div className='flex gap-3'>
                <div>
                  <div>
                    <span className='opacity-70'>D.O.B.</span>
                  </div>
                  <input type="date" id="name" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="dob" required />
                </div>
                <div className='grow'>
                  <div>
                    <span className='opacity-70'>Email</span>
                  </div>
                  <input type="email" id="email" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email" required />
                </div>
              </div>
              <div>
                <div>
                  <span className='opacity-70'>Address</span>
                </div>
                <div className='address-fields w-full flex flex-col gap-3'>
                  <div className='w-full grow'>
                    <input type="text" id="name" className="grow mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Street" required />
                  </div>
                  <div className='flex gap-3'>
                    <input type="text" id="name" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="City" required />
                    <input type="text" id="name" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="State" required />
                  </div>
                  <div className='flex gap-3'>
                    <input type="text" id="name" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Country" required />
                    <input type="number" id="name" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Pincode" required />
                  </div>
                </div>
              </div>
              <div>
                <div className='flex justify-between opacity-70'>
                  <span>Create Password</span>
                </div>
                <div className='flex items-center gap-3'>
                  <input type={showPassword ? "text" : "password"} id="password" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Please Enter Password" required />
                  <button type='button' onClick={() => setShowPassword(!showPassword)}>
                    {
                      showPassword ?
                        <FaEyeSlash size={25} /> :
                        <FaEye size={25} />
                    }
                  </button>
                </div>
              </div>
              <div className='flex gap-3 flex-col justify-center'>
                <button className='bg-green-600 hover:bg-green-700 text-light font-bold px-6 py-2 rounded transition-all'>Register User</button>
                <hr />
                <button type='button' onClick={() => { setOpenFormLogin(true) }} className='bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded transition-all'>Already Registered? Please Login</button>
              </div>
            </form>
          </div>
          <div className='login'>
            <form onSubmit={handleLoginFormSubmit} className='h-full flex flex-col justify-center p-5 gap-7'>
              <h1 className='text-2xl font-bold'>Login</h1>
              <div>
                <div>
                  <span className='opacity-70'>Email</span>
                </div>
                <input type="email" id="email" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Please Enter Email" required />
              </div>
              <div>
                <div className='flex justify-between opacity-70'>
                  <span>Password</span>
                  <span className='text-primary'>Forgot Password ?</span>
                </div>
                <div className='flex items-center gap-3'>
                  <input type={showPassword ? "text" : "password"} id="password" className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Please Enter Password" required />
                  <button type='button' onClick={() => setShowPassword(!showPassword)}>
                    {
                      showPassword ?
                        <FaEyeSlash size={25} /> :
                        <FaEye size={25} />
                    }
                  </button>
                </div>
              </div>
              <div className='flex gap-3 flex-col justify-center'>
                <button
                  type='submit'
                  className='bg-green-600 hover:bg-green-700 text-light font-bold px-6 py-2 rounded transition-all'>
                  Login
                </button>
                <hr />
                <button type='button' onClick={() => { setOpenFormLogin(false) }} className='bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded transition-all'>New Here? Please Register</button>
              </div>
            </form>
          </div>
          <div className={`slider ${openFormLogin ? "login" : "register"}`}>
            <div className='text-data h-full flex flex-col justify-end gap-2 text-light p-6'>
              <span className='font-bold text-2xl'>Welcome</span>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.?</p>
              <span className='bg-primary p-2 font-bold w-fit rounded'>Get 20% Off</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLoginRegisterForm
