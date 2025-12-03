import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";

import { fetchAllJobs } from "../api/jobAPI.js";

const JobContext = createContext()

const JobProvider = ({ children }) => {

    let [jobs, setJobs] = useState([])

    const fetchInitialJobs = async () => {
        try {
            let result = await fetchAllJobs()

            if (result.status != 200) throw ("unable to fetch jobs data !")

            console.log(result)

            setJobs(result.data.jobData)

        } catch (err) {
            console.log("faile to fetch jobs : ", err)
            setJobs([])
        }
    }

    useEffect(() => {
        fetchInitialJobs()
    }, [])  

    return (
        <JobContext.Provider value={{ jobs }}>
            {children}
        </JobContext.Provider>
    )
}

export const useJobs = () => {
    return useContext(JobContext)
}

export { JobProvider }