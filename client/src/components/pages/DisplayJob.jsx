import React from 'react'
import { useParams } from 'react-router-dom'

import Header from '../sections/includes/Header'
import Footer from '../sections/includes/Footer'
import JobPage from '../sections/jobs/JobPage'

const DisplayJob = () => {

    let { jobId } = useParams()

    return (
        <>
            <Header />
            <JobPage jobId={jobId} />
            <Footer />
        </>
    )
}

export default DisplayJob
