import React, { useState } from 'react'

// style
import "./user-action.scss"

// react icons
import { FaTimes, FaUser, FaCamera, FaCheckCircle } from 'react-icons/fa'
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

// context
import { useUser } from '../../../../context/userContext'
import { useMessage } from '../../../../context/messageContext';

// user api
import { userProfilePicture, requestOTPForPasswordReset, requestUserEmailOtpVerificationPasswordReset } from '../../../../api/userAPI';

// dependency
import OtpInput from 'react-otp-input';

const Profile = () => {

    let { user } = useUser()

    let { triggerMessage } = useMessage()

    let [triggerProfilePictureChange, setTriggerProfilePictureChange] = useState(false)

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
                                        <img src={user.logedIn ? `${import.meta.env.VITE_BASE_API_URL}/profile_pictures/${user.profile_picture}` : ""} alt="Profile Picture" /> :
                                        <button onClick={() => setTriggerProfilePictureChange(true)} className='bg-primary px-2 py-1 text-light rounded hover:bg-dark transition'>
                                            <FaCamera />
                                        </button>
                                    : null
                            }

                            {
                                triggerProfilePictureChange &&
                                <div className='profile-picture-change'>
                                    <div className='picture-change-container rounded'>
                                        <h1>hello</h1>
                                    </div>
                                </div>
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
                        {/* Password Reset and document uploads */}
                        <div className='p-3 flex gap-4'>
                            <button onClick={() => setTriggerEditForm(true)} className='bg-primary p-1 text-light rounded hover:bg-dark transition'>Password Reset</button>

                            <button onClick={() => setTriggerEditForm(true)} className='bg-primary p-1 text-light rounded hover:bg-dark transition'>Upload Resume</button>
                        </div>
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
        </>
    )
}


export default Profile


// edit form a sperate components 

// to create sperate section for actions[profile picture/reset password/upload resume]