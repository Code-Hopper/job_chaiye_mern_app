import React, { useState } from 'react'

import "./user-action.scss"

import { FaTimes, FaUser } from 'react-icons/fa'
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { useUser } from '../../../../context/userContext'

const Profile = () => {

    let { user } = useUser()

    let [triggerEditForm, setTriggerEditForm] = useState(false)

    const EditPopUpForm = (props) => {
        return (
            <div id='edit-pop-up-form'>
                <div className='edit-form rounded relative'>
                    <h1>this is pop-up form</h1>
                    <button onClick={() => { setTriggerEditForm(!triggerEditForm) }} className='absolute left-full -translate-x-1/2 top-0 -translate-y-1/2 top-0 bg-red-500 hover:bg-red-700 transition p-2 font-bold rounded-full text-light'>
                        <FaTimes />
                    </button>
                </div>
            </div>
        )
    }

    return (

        <>

            <div id='user-profile' className='shadow'>
                <div className='bg-dark'></div>
                <div className='information'>
                    <div className='pnpa'>
                        {/* image */}
                        <div className='profile-picture'>
                            {
                                user.logedIn ?
                                    user.profile_picture ?
                                        <img src={user.logedIn ? user.profile_picture : ""} alt="Profile Picture" /> :
                                        <button onClick={() => setTriggerEditForm(!triggerEditForm)} className='bg-primary p-1 text-light rounded hover:bg-dark transition'>+ Profile Picture</button>
                                    : null
                            }
                        </div>
                        {/* NPA*/}
                        <div className='user-info-container p-5 flex flex-col gap-3'>
                            <div className='flex gap-3 p-3 shadow'>
                                <div className='flex items-center gap-3'>
                                    <span className='user-info-icon'>
                                        <FaUser />
                                    </span>
                                    <span>{user.logedIn ? user.name : null}</span>
                                </div>

                                <div className='flex items-center gap-3'>
                                    <span className='user-info-icon' >
                                        <FaPhone />
                                    </span>
                                    <span>{user.logedIn ? user.phone : null}</span>
                                </div>
                            </div>
                            <div className='p-3 shadow'>
                                <div className='flex items-center gap-3'>
                                    <span className='user-info-icon'>
                                        <IoMdMail />
                                    </span>
                                    <span>{user.logedIn ? user.email.userEmail : null}</span>
                                    <FaCheckCircle className={`${user.logedIn ? user.email.verified ? "text-green-500" : "" : ""}`} />
                                </div>
                            </div>
                            <div className='p-3 shadow'>
                                <span className='flex  gap-3 items-center'>
                                    <span className='user-info-icon'>
                                        <FaLocationDot />
                                    </span>
                                    {
                                        user.logedIn ?
                                            user.address.street + ", " + user.address.city + ", " + user.address.state + ", " + user.address.country + ", " + user.address.pincode
                                            : null
                                    }
                                </span>
                            </div>
                        </div>
                        {/* Password Reset */}
                    </div>
                    <div className='reports p-3'>
                        {/* reports */}
                        <div className='applied-jobs rounded flex flex-col justify-center items-center gap-4 text-dark'>
                            <span className='text-4xl'>
                                {
                                    user.logedIn ? user.appliedJobs.length : 0
                                }
                            </span>
                            <span className='font-bold'>Applied Jobs</span>
                        </div>
                        <div className='profile-selected rounded flex flex-col justify-center items-center gap-4 text-dark'>
                            <span className='text-4xl'>
                                0
                            </span>
                            <span className='font-bold'>Profile Selected</span>
                        </div>
                    </div>
                    <div className='documents'>

                    </div>
                </div>
            </div>

            {triggerEditForm ? <EditPopUpForm /> : null}

        </>
    )
}



export default Profile
