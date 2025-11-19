import axios from "axios"

let baseUrl = import.meta.env.VITE_BASE_API_URL + "/user"


export const requestUserRegister = async (data) => {
    try {
        let result = await axios.post(`${baseUrl}/register`, data)
        return result
    } catch (err) {
        throw err
    }
}

export const requestUserEmailOtpVerification = async (data) => {
    try {
        let result = await axios.post(`${baseUrl}/verify-otp`, data)
        return result
    } catch (err) {
        throw err
    }
}

export const requestUserLogin = async (data) => {
    try {
        let result = await axios.post(`${baseUrl}/user-login`, data)
        return result
    } catch (err) {
        throw err
    }
}

export const requestUserProfile = async (token) => {
    try {
        let result = await axios({
            method: "GET",
            url: `${baseUrl}/fetch-urser-profile`,
            headers: {
                authorization: token
            }
        })

        return result

    } catch (err) {
        throw (err)
    }
}

export const userProfilePicture = async (token, formData) => {
    try {
        const result = await axios.post(
            `${baseUrl}/upload-file/profile_picture`,
            formData,
            {
                headers: {
                    authorization: token
                    // DO NOT add Content-Type manually
                }
            }
        );

        return result.data;

    } catch (err) {
        throw err;
    }
};

export const requestOTPForPasswordReset = async (email) => {
    try {
        console.log("reset passord for ", email)
        const result = await axios.post(`${baseUrl}/password-reset-request`, { email });
        return result
    } catch (err) {
        throw err
    }
}

export const requestUserEmailOtpVerificationPasswordReset = async (data) => {
    console.log(data)
    try {
        const result = await axios.post(`${baseUrl}/verify-reset-password-request`, data);
        return result
    } catch (err) {
        throw err
    }
}