import React, {useEffect, useState} from 'react'
import './EditQualification.scss'
import Images from '../../assets/images'
import {Link, useParams} from "react-router-dom"
import useGetQualifications from "../../hooks/useGetQualifications"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment-timezone'
import DropdownInput from "../DropDownInput"
import useGetAwardingOrganisations from "../../hooks/useGetAwardingOrganisations"
import useGetModules from "../../hooks/useGetModules"
import useGetTrainingProviders from "../../hooks/useGetTrainingProviders"
import useAuthorizationInterceptor from "../../hooks/useAuthorizationInterceptor"
interface editQualification {
    qualification_title: string,
    training_provider: number,
    module: number,
    awarding_organisation: number,
    issue_date: string,
    expire_date: string,
}

const EditQualification: React.FC = () => {

    const { userQualifications } = useGetQualifications()
    const { awardingOrganisations } = useGetAwardingOrganisations()
    const { modules } = useGetModules()
    const { trainingProviders } = useGetTrainingProviders()
    const { qualificationId } = useParams()

    const api = useAuthorizationInterceptor()

    const awardingOrganisationsOptions = awardingOrganisations?.map(item => ({
        id: item.id,
        name: item.name
    })) || []
    const modulesOptions = modules?.map(item => ({
        id: item.id,
        name: item.name
    })) || []
    const trainingProvidersOptions = trainingProviders?.map(item => ({
        id: item.id,
        name: item.name
    })) || []


    const [editQualificationData, setEditQualificationData] = useState<editQualification>({
        qualification_title: '',
        training_provider: 0,
        module: 0,
        awarding_organisation: 0,
        issue_date: '',
        expire_date: '',
    })

    useEffect(() => {
        if (userQualifications && qualificationId) {
            // Find the qualification that matches the qualificationId
            const matchingQualification = userQualifications.find(
                (qualification) => qualification.id === Number(qualificationId)
            )

            if (matchingQualification) {
                setEditQualificationData({
                    qualification_title: matchingQualification.qualification_title || '',
                    training_provider: matchingQualification.training_provider.id || 0,
                    module: matchingQualification.module.id || 0,
                    awarding_organisation: matchingQualification.awarding_organisation.id || 0,
                    issue_date: matchingQualification.issue_date || '',
                    expire_date: matchingQualification.expire_date || ''
                })
            }
        }
    }, [userQualifications, qualificationId])

    useEffect(() => {
        if (editQualificationData.issue_date !== '' && editQualificationData.expire_date !== '') {
            handleDateChange('issue_date', editQualificationData.issue_date)
            handleDateChange('expire_date', editQualificationData.expire_date)
        }
    }, [editQualificationData.issue_date, editQualificationData.expire_date])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target

        setEditQualificationData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleDateChange = (name: string, value: string | null) => {
        if (value) {
            const formattedDate = moment(value).format('YYYY-MM-DD')
            setEditQualificationData((prevData) => ({
                ...prevData,
                [name]: formattedDate,
            }))
        } else {
            setEditQualificationData((prevData) => ({
                ...prevData,
                [name]: '',
            }))
        }
    }

    const handleDropdownChange = (name: string, value: string) => {
        const numericValue = parseInt(value, 10)

        setEditQualificationData((prevData) => ({
            ...prevData,
            [name]: numericValue,
        }))
    }
    const handleUpdate = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await api.patch(
                `/qualifications/${qualificationId}/`,
                editQualificationData
            )

        } catch (error) {
            console.error('Error updating qualification:', error)
        }
    }

    return (
        <div className='page edit-qualification'>
            <div className='top-page'>
                <Link
                    to='/homepage'
                    className='back-settings'
                >
                    <img
                        src={Images.backButton}
                        className="back-button"
                        alt=""
                    />
                    <div className='back'>
                        Back
                    </div>
                </Link>
                <div className='qualification-edit'>
                    Edit Qualification
                </div>
            </div>
            <div className='edit-qualification-form'>
                <div className='form-title'>Your Qualification</div>
                <div className='input-title qualification-title'>Qualification Title</div>
                <input
                    data-testid="qualification-title"
                    type="text"
                    className="custom-input"
                    value={editQualificationData.qualification_title}
                    onChange={handleInputChange}
                    name="qualification_title"
                />
                <div className='input-title training-provider'>Training Provider</div>
                <DropdownInput
                    data-testid="qualification-training-provider"
                    options={trainingProvidersOptions}
                    value={editQualificationData.training_provider}
                    onChange={(event) => handleDropdownChange("training_provider", event.target.value)}
                    inputName="training_provider"
                />
                <div className='input-title module'>Module</div>
                <DropdownInput
                    options={modulesOptions}
                    value={editQualificationData.module}
                    onChange={(event) => handleDropdownChange("module", event.target.value)}
                    inputName="module"
                />
                <div className='input-title awarding-organisation'>Awarding Organisation</div>
                <DropdownInput
                    options={awardingOrganisationsOptions}
                    value={editQualificationData.awarding_organisation}
                    onChange={(event) => handleDropdownChange("awarding_organisation", event.target.value)}
                    inputName="awarding_organisation"
                />
                <div className='input-title issue-date'>Issue Date</div>
                <DatePicker
                    selected={editQualificationData.issue_date ? moment(editQualificationData.issue_date).toDate() : null}
                    onChange={(date) => handleDateChange("issue_date", date?.toISOString() || null)}
                    className="date"
                    name="issue_date"
                />
                <div className='input-title expiry-date'>Expiry Date</div>
                <DatePicker
                    selected={editQualificationData.expire_date ? moment(editQualificationData.expire_date).toDate() : null}
                    onChange={(date) => handleDateChange("expire_date", date?.toISOString() || null)}
                    className="date"
                    name="expire_date"
                />
            </div>
            <div className='edit-qualification-update'>
                <button
                    className='button'
                    onClick={handleUpdate}
                >
                    Update
                </button>
                <div>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    I've changed my mind
                </div>
            </div>
        </div>
    )

}

export default EditQualification