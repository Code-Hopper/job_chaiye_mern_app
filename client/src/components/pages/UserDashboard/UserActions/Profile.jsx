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

    let { user, fetchUserProfile } = useUser()

    let { triggerMessage } = useMessage()

    let [triggerProfilePictureChange, setTriggerProfilePictureChange] = useState(false)

    let [selectedImage, setSelectedImage] = useState(null)

    let [previewUrl, setPreviewUrl] = useState(null)

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith("image/")) {
            setSelectedImage(file)
            setPreviewUrl(URL.createObjectURL(file))
        } else {
            triggerMessage("warning", "invalid/missing file !")
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith("image/")) {
            setSelectedImage(file)
            setPreviewUrl(URL.createObjectURL(file))
        } else {
            triggerMessage("warning", "invalid/missing file !")
        }
    }

    const handleProfilePictureUpload = async () => {
        let formData = new FormData();
        formData.append("file", selectedImage);

        try {
            let token = localStorage.getItem("token");

            let result = await userProfilePicture(token, formData);

            console.log(result)

            setTriggerProfilePictureChange(false)
            triggerMessage("success", "Profile picture uploaded!");
            // window.redirect("/")
            fetchUserProfile()
            setPreviewUrl(null)
            setSelectedImage(null)

        } catch (err) {
            setTriggerProfilePictureChange(false)
            triggerMessage("danger", err?.response?.data?.message || "Upload failed");
        }
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
                                        <>
                                            <img src={user.logedIn ? `${import.meta.env.VITE_BASE_API_URL}/profile_pictures/${user.profile_picture}` : ""} alt="Profile Picture" />
                                            <button onClick={() => setTriggerProfilePictureChange(true)} className='bg-primary px-2 py-1 text-light rounded hover:bg-dark transition'>
                                                <FaCamera />
                                            </button>
                                        </>
                                        :
                                        <button onClick={() => setTriggerProfilePictureChange(true)} className='bg-primary px-2 py-1 text-light rounded hover:bg-dark transition'>
                                            <FaCamera />
                                        </button>
                                    : null
                            }

                            {
                                triggerProfilePictureChange &&
                                <div className='profile-picture-change'>
                                    <div className='picture-change-container rounded relative'>
                                        <button onClick={() => {
                                            setSelectedImage(null)
                                            setPreviewUrl(null)
                                            setTriggerProfilePictureChange(false)
                                        }} className='bg-red-600 p-2 rounded-full absolute text-white start-full top-0 -translate-x-1/2 -translate-y-1/2'>
                                            <FaTimes />
                                        </button>
                                        <div className='content flex justify-center items-center p-52'>
                                            <div
                                                className='grow upload-area bg border border-dashed border-dark p-5 rounded'
                                                onDrop={handleDrop}
                                                onDragOver={handleDragOver}
                                            >

                                                <button
                                                    onClick={() => {

                                                    }}
                                                >

                                                </button>

                                                <label htmlFor="profileImage" className='cursor-pointer'>
                                                    {
                                                        previewUrl ? (
                                                            <div className='flex justify-center items-center flex-col gap-3'>
                                                                <span className='font-bold'>Your Selected Profile Picture !</span>
                                                                <img src={previewUrl} className='h-40 w-40' />
                                                            </div>
                                                        ) : (
                                                            <div className='flex flex-col items-center justify-center gap-3'>
                                                                <span>Drag & Drop Profile Picture Here !</span>
                                                                <span className='bg-blue-200 rounded p-2'>or <b>Click</b> to select.</span>
                                                            </div>
                                                        )
                                                    }
                                                </label>

                                                <input
                                                    type="file"
                                                    id='profileImage'
                                                    accept='image/*'
                                                    onChange={handleFileSelect}
                                                    className='hidden'
                                                />

                                                {
                                                    selectedImage &&
                                                    <div className='flex justify-center my-10'>
                                                        <button
                                                            onClick={handleProfilePictureUpload}
                                                            className='bg-primary text-light font-bold px-3 py-1 cursor-pointer'>
                                                            Upload
                                                        </button>
                                                    </div>
                                                }

                                            </div>
                                        </div>
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