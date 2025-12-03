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
                    jobs.length != 0 && jobs ?
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


// [
//     {
//         "timeStamp": "2025-12-03T05:54:08.252Z",
//         "_id": "692e775c488339627741c778",
//         "title": "Full Stack MERN Developer",
//         "jobCreatedBy": {
//             "_id": "692e76358c8b01ed527b27b7",
//             "companyDetails": {
//                 "name": "Tech Prism Pvt Ltd",
//                 "est_year": "2015",
//                 "address": {
//                     "street": "MG Road",
//                     "city": "Pune",
//                     "state": "Maharashtra",
//                     "country": "India",
//                     "pincode": "411001"
//                 },
//                 "bio": "We are a software development and IT consulting company.",
//                 "website": "https://techprism.in",
//                 "industryType": "Software Development",
//                 "founders": [
//                     "Amey Khondekar",
//                     "John Doe"
//                 ],
//                 "hrEmail": "hr@techprism.in"
//             },
//             "contact_person": {
//                 "name": "Amey Khondekar",
//                 "phone": "9876543210",
//                 "email": "amey@techprism.in",
//                 "position": "HR Manager"
//             },
//             "email": {
//                 "userEmail": "company@techprism.in",
//                 "verified": true
//             },
//             "phone": "9876543210",
//             "companyLogo": "uploads/company-logo.png",
//             "documents": [
//                 "uploads/doc1.pdf",
//                 "uploads/doc2.pdf"
//             ],
//             "createJobs": [],
//             "password": "Company@123"
//         },
//         "jobRequirements": {
//             "type": "Full-Time",
//             "category": "Software Development",
//             "exprience": "2-4 years",
//             "location": "Pune, Maharashtra",
//             "offeredSalary": 45000,
//             "description": "We are looking for a MERN Stack Developer with strong frontend + backend expertise."
//         },
//         "applications": [
//             {
//                 "_id": "69144467202cb2a8f0d1865a",
//                 "name": "Amey Anil Khondekar",
//                 "email": {
//                     "userEmail": "ameykhondekar01@gmail.com",
//                     "verified": true,
//                     "_id": "69144467202cb2a8f0d1865b"
//                 },
//                 "password": "$2b$10$EHpVH5f57f7tmKjprRzR3eOr.a0pnJILCKuhXOTaDLAHvJ876FaH.",
//                 "phone": "09766696550",
//                 "address": {
//                     "street": "sakkaradhara",
//                     "city": "nagpur",
//                     "state": "Maharashtra",
//                     "country": "India",
//                     "pincode": "440024",
//                     "_id": "69144467202cb2a8f0d1865c"
//                 },
//                 "dob": "2025-05-11",
//                 "qualifications": "",
//                 "documents": [
//                     "1764144448318-ERP_Documentation.pdf",
//                     "1764144472221-Pharma-billing-backend-and-frontend-blueprint.pdf",
//                     "1764314391799-loan_amortization.pdf"
//                 ],
//                 "profile_picture": "1764314630441-352.jpg",
//                 "appliedJobs": [
//                     {
//                         "jobRequirements": {
//                             "type": {
//                                 "required": true
//                             },
//                             "category": {
//                                 "required": true
//                             },
//                             "exprience": {
//                                 "required": true
//                             },
//                             "location": {
//                                 "required": true
//                             },
//                             "postDate": {
//                                 "default": 1764741248252,
//                                 "required": true
//                             },
//                             "offeredSalary": {
//                                 "required": true
//                             },
//                             "description": {
//                                 "required": true
//                             }
//                         },
//                         "applications": [],
//                         "closed": false,
//                         "maxApplications": 0,
//                         "timeStamp": "2025-12-03T05:54:08.252Z",
//                         "_id": "692e775c488339627741c778"
//                     }
//                 ],
//                 "timeStamp": "2025-11-12T08:25:11.266Z",
//                 "__v": 0
//             },
//             {
//                 "_id": "692d28e5add60df877361816",
//                 "name": "Devashree Deshpande",
//                 "email": {
//                     "userEmail": "devashreed03@gmail.com",
//                     "verified": false,
//                     "_id": "692d28e5add60df877361817"
//                 },
//                 "password": "$2b$10$MIhT4PBVJBPexwqCTW.iXuU36cq7QbLD96SCBjtWQoiRzW9hBdmiC",
//                 "phone": "9145252569",
//                 "address": {
//                     "street": "sakkaradhara",
//                     "city": "nagpur",
//                     "state": "Maharashtra",
//                     "country": "India",
//                     "pincode": "440024",
//                     "_id": "692d28e5add60df877361818"
//                 },
//                 "dob": "2001-11-03",
//                 "qualifications": "",
//                 "documents": [],
//                 "profile_picture": "",
//                 "appliedJobs": [
//                     {
//                         "jobRequirements": {
//                             "type": {
//                                 "required": true
//                             },
//                             "category": {
//                                 "required": true
//                             },
//                             "exprience": {
//                                 "required": true
//                             },
//                             "location": {
//                                 "required": true
//                             },
//                             "postDate": {
//                                 "default": 1764741248252,
//                                 "required": true
//                             },
//                             "offeredSalary": {
//                                 "required": true
//                             },
//                             "description": {
//                                 "required": true
//                             }
//                         },
//                         "applications": [],
//                         "closed": false,
//                         "maxApplications": 0,
//                         "timeStamp": "2025-12-03T05:54:08.252Z",
//                         "_id": "692e775c488339627741c778"
//                     }
//                 ],
//                 "timeStamp": "2025-12-01T05:34:29.210Z",
//                 "__v": 0
//             }
//         ],
//         "closed": false,
//         "maxApplications": 50
//     }
// ]