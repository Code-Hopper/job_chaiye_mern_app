import axios from "axios"

let baseUrl = import.meta.env.VITE_BASE_API_URL + "/job"

export const fetchAllJobs = async () => {
    try {
        let result = axios({
            method: "GET",
            url: `${baseUrl}/all`
        })
        return result
    } catch (err) {
        throw err
    }
}