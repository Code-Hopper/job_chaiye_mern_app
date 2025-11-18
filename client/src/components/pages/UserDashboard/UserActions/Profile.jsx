import React, { useState } from 'react'

import "./user-action.scss"

import { FaTimes, FaUser } from 'react-icons/fa'
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { useUser } from '../../../../context/userContext'
import { userProfilePicture } from '../../../../api/userAPI';
import { useMessage } from '../../../../context/messageContext';

const Profile = () => {

    let { user } = useUser()

    let [triggerEditForm, setTriggerEditForm] = useState(false)

    const EditPopUpForm = ({ close }) => {

        let [profilePicture, setProfilePicture] = useState()

        let [tab, setTab] = useState("profile");

        let { triggerMessage } = useMessage()

        const handleProfilePictureChange = (e) => {
            setProfilePicture(e.target.files[0])
        }

        const handleProfilePictureUpload = async (e) => {
            e.preventDefault();

            let formData = new FormData();
            formData.append("file", profilePicture);

            try {
                let token = localStorage.getItem("token");

                let result = await userProfilePicture(token, formData);

                console.log(result)

                triggerMessage("success", "Profile picture uploaded!");

                close();
            } catch (err) {
                triggerMessage("danger", err?.response?.data?.message || "Upload failed");
                close();
            }
        };

        return (
            <div id='edit-pop-up-form'>
                <div className='edit-form rounded relative p-6'>

                    {/* Close Button */}
                    <button
                        onClick={close}
                        className='absolute left-full -translate-x-1/2 top-0 -translate-y-1/2 bg-red-500 hover:bg-red-700 transition p-2 font-bold rounded-full text-light'
                    >
                        <FaTimes />
                    </button>

                    {/* Tabs */}
                    <div className='flex justify-around mb-5'>
                        <button className={`tab-btn ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}>
                            Upload Profile
                        </button>
                        <button className={`tab-btn ${tab === "password" ? "active" : ""}`} onClick={() => setTab("password")}>
                            Reset Password
                        </button>
                        <button className={`tab-btn ${tab === "docs" ? "active" : ""}`} onClick={() => setTab("docs")}>
                            Upload Documents
                        </button>
                    </div>

                    {/* Content Sections */}
                    <div className='tab-content'>

                        {/* ---------- Upload Profile Picture ---------- */}
                        {tab === "profile" && (
                            <div className='flex flex-col gap-4'>
                                <h2 className='font-bold text-lg'>Upload Profile Picture</h2>
                                <form onSubmit={handleProfilePictureUpload}>
                                    <input
                                        type="file"
                                        name="profilePicture"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        className='border p-2 rounded'
                                    />
                                    <button type='submit' className='bg-primary text-light p-2 rounded hover:bg-dark'>
                                        Upload
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* ---------- Reset Password (OTP Form) ---------- */}
                        {tab === "password" && (
                            <div className='flex flex-col gap-4'>
                                <h2 className='font-bold text-lg'>Reset Password</h2>

                                <input
                                    type="text"
                                    placeholder='Enter Phone Number'
                                    className='border p-2 rounded'
                                />

                                <button className='bg-dark text-light p-2 rounded hover:bg-primary transition'>
                                    Send OTP
                                </button>

                                <input
                                    type="text"
                                    placeholder='Enter OTP'
                                    className='border p-2 rounded'
                                />

                                <input
                                    type="password"
                                    placeholder='New Password'
                                    className='border p-2 rounded'
                                />

                                <button className='bg-primary text-light p-2 rounded hover:bg-dark'>
                                    Reset Password
                                </button>
                            </div>
                        )}

                        {/* ---------- Upload Documents ---------- */}
                        {tab === "docs" && (
                            <div className='flex flex-col gap-4'>
                                <h2 className='font-bold text-lg'>Upload Documents</h2>

                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => console.log("Docs selected:", e.target.files)}
                                    className='border p-2 rounded'
                                />

                                <button className='bg-primary text-light p-2 rounded hover:bg-dark'>
                                    Upload Documents
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        );
    };

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

            {triggerEditForm ? <EditPopUpForm close={() => setTriggerEditForm(false)} /> : null}

        </>
    )
}



export default Profile
