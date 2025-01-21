import React from 'react'
import './HomePage.scss'
import Images from '../../assets/images'
import useGetQualifications from "../../hooks/useGetQualifications"
import QualificationCard from "../QualificationCard"
import {useNavigate} from "react-router-dom"

const HomePage: React.FC = () => {
    const {userQualifications, setUserQualifications} = useGetQualifications()

    const navigate = useNavigate()

    const handleDeleteQualification = (qualificationId : number | null) => {
        setUserQualifications(prevUserQualifications => {
            if (prevUserQualifications) {
                return prevUserQualifications.filter(link => link.id !== qualificationId)
            }
            return []
        })
    }
    const handleAddQualification = () => {
        navigate('/add-qualifications')
    }

    return (
        <div className='page homepage'>
            <div className='greetings'>
                Hey, {userQualifications?.length && userQualifications.length > 0 ? userQualifications[0].user.first_name : 'Error'}
            </div>
            <div className='your-qualifications'>
                <img
                    src={Images.verifiedCheck}
                    className='verified-check icon-subtitle'
                    alt=""
                />
                <div className='qualifications-subtitle'>
                    Your Qualifications
                </div>
            </div>
            {userQualifications?.length && userQualifications.length > 0 ? (
                <QualificationCard
                    qualification={userQualifications[userQualifications.length-1]}
                    onDelete={() => handleDeleteQualification(userQualifications[userQualifications.length-1].id)}
                />
            ) : (
                <div className='qualification-card empty-state'>
                    <div className='qualification empty-state-text'>
                        <div className='qualification-title empty-state-title'>
                            Get Started
                        </div>
                        <div className='qualification-type empty-state-subtitle'>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            It's currently empty in here, go ahead and add
                            your first Qualifications.
                        </div>
                    </div>
                    <div className='line'/>
                    <button
                        className='button add-qualification'
                        onClick={handleAddQualification}
                    >
                        + Add Qualification
                    </button>
                </div>
            )}
        </div>
    )
}

export default HomePage