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
import { requestOTPForPasswordReset } from '../../../../api/userAPI';
import { requestUserEmailOtpVerificationPasswordReset } from "../../../../api/userAPI"
import OtpInput from 'react-otp-input';

const Profile = () => {

    let { user } = useUser()

    let [triggerEditForm, setTriggerEditForm] = useState(false)

    let { triggerMessage } = useMessage()

    const EditPopUpForm = ({ close, openTab }) => {

        let [profilePicture, setProfilePicture] = useState()

        let [tab, setTab] = useState("profile");

        let { user } = useUser();

        let [loading, setLoading] = useState(false)

        let [otp, setOtp] = useState(0)

        let [openOTPFormForPasswordReset, setOpenOTPFormForPasswordReset] = useState(true)

        let [newPasswordForm, setNewPasswordForm] = useState({
            email: "", userOtp: "", newPassword: ""
        })

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

                // close();
            } catch (err) {
                triggerMessage("danger", err?.response?.data?.message || "Upload failed");
                // close();
            }
        };

        const handlePasswordResetButtonClick = async () => {
            setOpenOTPFormForPasswordReset(true)

            try {
                let result = await requestOTPForPasswordReset(user.email.userEmail)

                console.log(result)

                triggerMessage("success", `sent an otp at ${user ? user.email.userEmail : "not found !"}`)

            } catch (err) {
                console.log('failed to send an otp for password reset !', err)
                triggerMessage("danger", "failed to send OTP for password reset !")
            }
        }

        const handlePasswordResetOtpVerification = async (e, email) => {
            e.preventDefault()
            try {

                setLoading(true)
                // creating data
                // setNewPasswordForm(prev => {
                //     return { ...prev, email: email, userOtp: otp }
                // })

                let playLoad = {
                    email: email,
                    userOtp: otp,
                    newPassword: newPasswordForm.newPassword
                }

                let result = await requestUserEmailOtpVerificationPasswordReset(playLoad)

                if (result.status != 202) throw ("unable to verify OTP !")

                triggerMessage("success", result.data.message ? result.data.message : "OTP verifed successfully & password reseted !", true)

                setOpenOTPFormForPasswordReset(false)

                // close()

            } catch (err) {
                console.log("verify otp error : ", err)
                triggerMessage("danger", err.message ? err.message : err, true)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }

        return (
            <div id='edit-pop-up-form'>
                <div className='edit-form rounded relative p-6'>

                    {/* Close Button */}
                    <button
                        type='button'
                        onClick={close}
                        className='absolute left-full -translate-x-1/2 top-0 -translate-y-1/2 bg-red-500 hover:bg-red-700 transition p-2 font-bold rounded-full text-light'
                    >
                        <FaTimes />
                    </button>

                    {/* Tabs */}
                    <div className='flex justify-around mb-5'>
                        <button type='button' className={`tab-btn ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}>
                            Upload Profile
                        </button>
                        <button type='button' className={`tab-btn ${tab === "password" ? "active" : ""}`} onClick={() => setTab("password")}>
                            Reset Password
                        </button>
                        <button type='button' className={`tab-btn ${tab === "docs" ? "active" : ""}`} onClick={() => setTab("docs")}>
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

                                {
                                    openOTPFormForPasswordReset ?
                                        <div className='verify-password-reset'>
                                            <form onSubmit={(e) => { handlePasswordResetOtpVerification(e, user ? user.email.userEmail : "") }} className='h-full flex flex-col justify-center items-center p-5 gap-3'>
                                                <h1 className='text-2xl font-bold'>Verify <span className='text-primary'>Email</span></h1>
                                                <span className='text-center'>An otp has been sent on email <span className='text-primary'>{user ? user.email.userEmail : ""}</span></span>
                                                <OtpInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    numInputs={4}
                                                    renderSeparator={<span className='mx-2'>-</span>}
                                                    isInputNum={true}
                                                    shouldAutoFocus={true}
                                                    inputStyle={{
                                                        border: "1px solid black",
                                                        borderRadius: "8px",
                                                        width: "54px",
                                                        height: "54px",
                                                        fontSize: "12px",
                                                        color: "#000",
                                                        fontWeight: "400",
                                                        caretColor: "blue"
                                                    }}
                                                    focusStyle={{
                                                        border: "1px solid #CFD3DB",
                                                        outline: "none"
                                                    }}
                                                    renderInput={(props) => <input {...props} />}
                                                />
                                                <input name="newPassword" value={newPasswordForm.newPassword} onChange={(e) => {
                                                    setNewPasswordForm(prev => {
                                                        return { ...prev, newPassword: e.target.value }
                                                    })
                                                }} className="mt-2 bg-white border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" placeholder='Enter new password !' />
                                                <button type='submit' className={`${loading ? "bg-gray-800 hover:bg-gray-800" : "bg-green-600"} hover:bg-green-700 text-light font-bold px-6 py-2 rounded transition-all`} disabled={loading}>
                                                    {loading ? "Processing..." : "Verify OTP"}
                                                </button>
                                            </form>
                                        </div>
                                        :
                                        <div className='p-4 my-2 flex flex-col gap-4 justify-center items-center'>
                                            <span>Click on request to send an OTP</span>
                                            <span className='rounded text-light font-bold p-3 bg-[rgba(var(--primary),.75)]'>at {user ? user.email.userEmail : "not found !"}</span>
                                            <button type='button' onClick={handlePasswordResetButtonClick} className='bg-green-400 rounded hover:bg-green-500 px-2 py-1'>
                                                Request
                                            </button>
                                        </div>
                                }

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

                                <button type='button' className='bg-primary text-light p-2 rounded hover:bg-dark'>
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
                                        <button onClick={() => setTriggerEditForm(true)} className='bg-primary p-1 text-light rounded hover:bg-dark transition'>+ Profile Picture</button>
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

            {triggerEditForm ? <EditPopUpForm close={() => setTriggerEditForm(false)} /> : null}

        </>
    )
}



export default Profile
