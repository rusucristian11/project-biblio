import React from 'react'
import './ArchivedQualifications.scss'
import Images from '../../assets/images'
import useGetQualifications from "../../hooks/useGetQualifications"
import QualificationCard from "../QualificationCard"
import {useNavigate} from "react-router-dom"

const ArchivedQualifications: React.FC = () => {

    const {userQualifications, setUserQualifications} = useGetQualifications()

    const navigate = useNavigate()
    const handleAddQualification = () => {
        navigate('/add-qualifications')
    }
    const handleDeleteQualification = (qualificationId : number | null) => {
        setUserQualifications(prevUserQualifications => {
            if (prevUserQualifications) {
                return prevUserQualifications.filter(link => link.id !== qualificationId)
            }
            return []
        })
    }

    return (
        <div className='page homepage archived-qualifications'>
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
                userQualifications.map((qualification, index) => (
                    <div
                        className='qualifications'
                        key={index}
                    >
                        <QualificationCard
                            qualification={userQualifications[index]}
                            onDelete={() => handleDeleteQualification(userQualifications[index].id)}
                        />
                    </div>
                ))
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

export default ArchivedQualifications