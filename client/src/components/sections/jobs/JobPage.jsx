import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useJobs } from '../../../context/jobContext'
import { useNavigate } from 'react-router-dom'

const JobPage = ({ jobId }) => {

    // paramerter jobId
    // flter jobs based on jobId
    // then display it

    let navigate = useNavigate()

    if (!jobId) {
        navigate("/")
    }

    let { jobs } = useJobs()

    let [filtredJob, setFiltredJob] = useState()

    useEffect(() => {

        let result = jobs.filter((job) => {
            return job._id == jobId
        })

        setFiltredJob(result[0])

    }, [])

    return (
        <div>
            {
                filtredJob ?
                    <div>
                        <span className='text-3xl font-bold'>job page : </span>
                        <span>{filtredJob.title}</span>
                    </div>
                    : <h1>job not found</h1>
            }
        </div>
    )
}

export default JobPage
