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
import { userProfilePicture, requestOTPForPasswordReset, requestUserEmailOtpVerificationPasswordReset, uploadResume, uploadBIO } from '../../../../api/userAPI';

// dependency
import OtpInput from 'react-otp-input';

const Profile = () => {

    let { user, fetchUserProfile } = useUser()

    let { triggerMessage } = useMessage()

    let [triggerProfilePictureChange, setTriggerProfilePictureChange] = useState(false)

    let [selectedImage, setSelectedImage] = useState(null)

    let [previewUrl, setPreviewUrl] = useState(null)

    let [passwordResetRequest, setPasswordResetRequest] = useState(false)

    let [newPassword, setNewPassword] = useState({
        password: "", otp: ""
    })

    let [loading, setLoading] = useState(false)

    let [resumeFile, setResumeFile] = useState(null)

    let [resumeUploadLoading, setResumeUploadLoading] = useState(false)

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

    const handlePasswordResetButtonClick = async () => {
        setPasswordResetRequest(true)
        try {
            let result = await requestOTPForPasswordReset(user.email.userEmail)

            console.log(result)

            triggerMessage("success", `sent an otp at ${user ? user.email.userEmail : "not found !"}`)

        } catch (err) {
            console.log('failed to send an otp for password reset !', err)
            triggerMessage("danger", "failed to send OTP for password reset !")
        }
    }

    const handleResetPasswordOtpVerification = async () => {
        try {
            setLoading(true)

            let playLoad = {
                email: user.email.userEmail,
                ...newPassword
            }

            console.log(playLoad)

            let result = await requestUserEmailOtpVerificationPasswordReset(playLoad)

            if (result.status != 202) throw ("unable to verify OTP !")

            triggerMessage("success", result.data.message ? result.data.message : "OTP verifed successfully & password reseted !", true)

            setPasswordResetRequest(false)
            setNewPassword({
                password: "", otp: ""
            })

        } catch (err) {
            console.log("verify otp error : ", err)
            triggerMessage("danger", err.message ? err.message : err, true)
            setPasswordResetRequest(false)
            setNewPassword({
                password: "", otp: ""
            })
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const handleResumeUpload = async () => {
        if (!resumeFile) return triggerMessage("warning", "Select a resume file!", true);

        let formData = new FormData();
        formData.append("file", resumeFile);

        try {
            setResumeUploadLoading(true)
            let token = localStorage.getItem("token");

            let result = await uploadResume(token, formData);

            triggerMessage("success", result.message || "Resume uploaded!");

            // Refresh user (documents[] update)
            fetchUserProfile();

            setResumeFile(null)

        } catch (err) {
            console.log(err)
            triggerMessage("danger", err?.response?.data?.message || "Resume upload failed!");
        } finally {
            setResumeUploadLoading(false)
        }
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
                        {/* Password Reset*/}
                        <div className='p-3'>
                            <div className=' flex gap-4'>
                                <input onChange={(e) => {
                                    setNewPassword(prev => {
                                        return { ...prev, password: e.target.value }
                                    })
                                }}
                                    className="grow bg-white border border-gray-300 outline-none text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                    type="text"
                                    placeholder='New Password'
                                    name='password'
                                    value={newPassword.password}
                                />
                                <button disabled={!newPassword.password}
                                    onClick={handlePasswordResetButtonClick} className='grow bg-primary p-1 text-light rounded hover:bg-dark transition disabled:bg-gray-600'>Update Password</button>
                            </div>
                            <div className=''>
                                {/* show otp field is requested */}
                                {
                                    passwordResetRequest ?
                                        <div className='verify-password-reset flex gap-4 flex-wrap'>
                                            <span className='my-4 block grow'>Please Verify OTP at your email :
                                                <span className='text-primary font-bold'> {user.logedIn ? user.email.userEmail : null}</span>
                                            </span>
                                            <OtpInput
                                                value={newPassword.otp}
                                                onChange={(otp) => {
                                                    setNewPassword(prev => {
                                                        return {
                                                            ...prev, otp: otp
                                                        }
                                                    })
                                                }}
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
                                            <button disabled={!newPassword.otp} onClick={handleResetPasswordOtpVerification}
                                                className='grow bg-primary p-1 text-light rounded hover:bg-dark transition disabled:bg-gray-600'>Verify</button>
                                        </div>
                                        :
                                        null
                                }
                            </div>
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
                        <div className='documents p-4 shadow rounded mt-5'>
                            <h3 className='font-bold text-lg mb-3'>Your Documents</h3>

                            {/* Show uploaded resumes */}
                            {
                                user.logedIn && user.documents.length > 0 ?
                                    <div className='uploaded-documents mb-4'>
                                        <h4 className='font-semibold mb-2'>Uploaded Resumes:</h4>
                                        <ul className='list-disc pl-5'>
                                            {
                                                user.documents.map((doc, index) => (
                                                    <li key={index}>
                                                        <a
                                                            href={`${import.meta.env.VITE_BASE_API_URL}/resumes/${doc}`}
                                                            target="_blank"
                                                            className='text-blue-600 underline'
                                                        >
                                                            {doc}
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    :
                                    <p>No resumes uploaded yet.</p>
                            }

                            {/* Upload new resume */}
                            <div className='mt-4'>
                                <label className='block font-semibold mb-2'>Upload New Resume:</label>

                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                    className='p-2 border rounded w-full'
                                />

                                <button
                                    disabled={!resumeFile || resumeUploadLoading}
                                    onClick={handleResumeUpload}
                                    className='mt-3 bg-primary text-light px-4 py-2 rounded hover:bg-dark disabled:bg-gray-400'
                                >
                                    {resumeUploadLoading ? "Uploading..." : "Upload Resume"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}


export default Profile

// edit form a sperate components 

// to create sperate section for actions[profile picture/reset password/upload resume]