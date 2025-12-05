import React from 'react'
import "../styles/job-grid.scss"
import { useJobs } from '../../../context/jobContext'
import { useNavigate } from 'react-router-dom'

const JobsGrid = () => {

    let navigate = useNavigate()
    let { jobs } = useJobs()

    return (
        <div id='job-grid'>
            <div className='content-container'>
                {
                    jobs && jobs.length != 0 ?
                        <div className='content'>
                            {
                                jobs.map((job, index) => {
                                    return (
                                        <div key={index} className='job border p-5'>
                                            <ul>
                                                <li>
                                                    {job.title}
                                                </li>
                                                <li>
                                                    created by : {job.jobCreatedBy.companyDetails.name}
                                                </li>
                                                <li>
                                                    <button onClick={() => {
                                                        navigate(`/job/${job._id}`)
                                                    }} className='bg-primary text-white font-bold px-3 py-1 rounded'>view job</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <h1>No Jobs Data Avaiable</h1>
                }
            </div>
        </div>
    )
}

export default JobsGrid