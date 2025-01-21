import React from 'react'
import './NewQualificationSuccess.scss'
import Images from "../../assets/images"
import {useNavigate} from "react-router-dom"
const NewQualificationSuccess: React.FC = () => {
    const navigate = useNavigate()
    const handleReturnHome = () => {
        navigate('/homepage')
        localStorage.setItem('activeLink', '/homepage')
    }
    return(
        <div className='success'>
            <div className='success-step'>Step 3</div>
            <div className="success-title">
                Success!
            </div>
            <div className="success-subtitle">
                Your qualification has been added successfully. Go Home to view it.
            </div>
            <img
                src={Images.checkmarkBlue}
                className="success-checkmark"
                alt=""
            />
            <button
                className='button btn-success'
                onClick={handleReturnHome}
            >
                Return Home
            </button>
        </div>
    )
}

export default NewQualificationSuccess