import React, {useEffect, useState} from 'react'
import './QualificationFinalStep.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment-timezone'
import DropdownInput from "../DropDownInput"
import useGetAwardingOrganisations from "../../hooks/useGetAwardingOrganisations"
import useGetModules from "../../hooks/useGetModules"
import useGetTrainingProviders from "../../hooks/useGetTrainingProviders"
import useAuthorizationInterceptor from "../../hooks/useAuthorizationInterceptor"
import Images from "../../assets/images"
import 'react-datepicker/dist/react-datepicker.css'
import useGetQualifications from "../../hooks/useGetQualifications"

interface QualificationProp {
    certificate_name: string,
    certificate_image: string,
    archived: boolean,
    qualification_title: string,
    training_provider: number,
    module: number,
    awarding_organisation: number,
    issue_date: string,
    expire_date: string,
}

interface QualificationFinalProp {
    onNext: () => void,
    onBack: () => void,
    certificateName: string,
    image: File | null
}

const QualificationFinalStep: React.FC<QualificationFinalProp> = ({onNext, onBack, image, certificateName}) => {
    const {modules} = useGetModules()
    const {trainingProviders} = useGetTrainingProviders()
    const {awardingOrganisations} = useGetAwardingOrganisations()
    const {refreshQualifications} = useGetQualifications()
    const selectOneOption = {id: 0, name: "Select One Option"}

    const awardingOrganisationsOptions = [
        selectOneOption,
        ...awardingOrganisations?.map((item) => ({
            id: item.id,
            name: item.name,
        })) || [],
    ]

    const modulesOptions = [
        selectOneOption,
        ...modules?.map((item) => ({
            id: item.id,
            name: item.name,
        })) || [],
    ]

    const trainingProvidersOptions = [
        selectOneOption,
        ...trainingProviders?.map((item) => ({
            id: item.id,
            name: item.name,
        })) || [],
    ]


    const [qualificationData, setQualificationData] = useState<QualificationProp>({
        archived: false,
        certificate_image: "",
        certificate_name: certificateName || "",
        qualification_title: certificateName || "",
        training_provider: 0,
        module: 0,
        awarding_organisation: 0,
        issue_date: '',
        expire_date: ''
    })

    const [qualificationTitleError, setQualificationTitleError] = useState<string>('')
    const [trainingProviderError, setTrainingProviderError] = useState<string>('')
    const [moduleError, setModuleError] = useState<string>('')
    const [awardingOrganisationError, setAwardingOrganisationError] = useState<string>('')
    const [issueDateError, setIssueDateError] = useState<string>('')
    const [expireDateError, setExpireDateError] = useState<string>('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target

        setQualificationData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    useEffect(() => {
        if (qualificationData.issue_date !== '' && qualificationData.expire_date !== '') {
            handleDateChange('issue_date', qualificationData.issue_date)
            handleDateChange('expire_date', qualificationData.expire_date)
        }
    }, [qualificationData.issue_date, qualificationData.expire_date])

    const handleDropdownChange = (name: string, value: string) => {
        const numericValue = parseInt(value, 10)

        setQualificationData((prevData) => ({
            ...prevData,
            [name]: numericValue,
        }))
    }
    const handleDateChange = (name: string, value: string | null) => {
        if (value) {
            const formattedDate = moment(value).format('YYYY-MM-DD')
            setQualificationData((prevData) => ({
                ...prevData,
                [name]: formattedDate,
            }))
        } else {
            setQualificationData((prevData) => ({
                ...prevData,
                [name]: '',
            }))
        }
    }

    const handleImageUpload = () => {
        if (image) {
            const reader = new FileReader()
            reader.onload = () => {
                const base64Image = reader.result as string;
                setQualificationData((prevData) => ({
                    ...prevData,
                    certificate_image: base64Image,
                }))
            }
            reader.readAsDataURL(image)
        }
    }

    useEffect(() => {
        handleImageUpload()
    }, [image])

    const api = useAuthorizationInterceptor()
    const handleNewQualification = async () => {
        if (qualificationData.qualification_title.length < 1) {
            setQualificationTitleError('Qualification Title is required.')
        } else {
            setQualificationTitleError('')
        }

        if (qualificationData.training_provider === 0) {
            setTrainingProviderError('Training Provider is required.')
        } else {
            setTrainingProviderError('')
        }

        if (qualificationData.module === 0) {
            setModuleError('Module is required.')
        } else {
            setModuleError('')
        }

        if (qualificationData.awarding_organisation === 0) {
            setAwardingOrganisationError('Awarding Organisation is required.')
        } else {
            setAwardingOrganisationError('')
        }

        if (!qualificationData.issue_date || !qualificationData.expire_date) {
            if (!qualificationData.issue_date) {
                setIssueDateError('Issue Date is required.')
            } else {
                setIssueDateError('')
            }
            if (!qualificationData.expire_date) {
                setExpireDateError('Expiry Date is required.')
            } else {
                setExpireDateError('')
            }
        }

        if (
            qualificationTitleError ||
            trainingProviderError ||
            moduleError ||
            awardingOrganisationError ||
            issueDateError ||
            expireDateError
        ) {
            return
        }

        try {
            const response = await api.post(
                `/qualifications/`,
                qualificationData
            )
            console.log('Qualification created', response.data)
            await refreshQualifications()
            onNext()
        } catch (error) {
            console.error('Error updating qualification:', error)
        }
    }
    const handlePreviousStep = () => {
        onBack()
    }


    return (
        <div className='qualification-final-step'>
            <div className='qualification-step'>Step 2</div>
            <div className='final-step-title'>
                Qualification Details
            </div>
            <div className='final-step-subtitle'>
                Most information can be found on the physical certificate as a guide
            </div>
            <div className='final-step-form'>
                <div className='form-title'>Your Qualification</div>
                <div className='input-title qualification-title'>Qualification Title</div>
                <input
                    type="text"
                    className="custom-input"
                    value={qualificationData.qualification_title}
                    onChange={handleInputChange}
                    name="qualification_title"
                />
                <div className="error-message">{qualificationTitleError}</div>
                <div className='input-title training-provider'>Training Provider</div>
                <DropdownInput
                    options={trainingProvidersOptions}
                    value={qualificationData.training_provider}
                    onChange={(event) => handleDropdownChange("training_provider", event.target.value)}
                    inputName="training_provider"
                />
                <div className="error-message">{trainingProviderError}</div>
                <div className='input-title module'>Module</div>
                <DropdownInput
                    options={modulesOptions}
                    value={qualificationData.module}
                    onChange={(event) => handleDropdownChange("module", event.target.value)}
                    inputName="module"
                />
                <div className="error-message">{moduleError}</div>
                <div className='input-title awarding-organisation'>Awarding Organisation</div>
                <DropdownInput
                    options={awardingOrganisationsOptions}
                    value={qualificationData.awarding_organisation}
                    onChange={(event) => handleDropdownChange("awarding_organisation", event.target.value)}
                    inputName="awarding_organisation"
                />
                <div className="error-message">{awardingOrganisationError}</div>
                <div className='input-title issue-date'>Issue Date</div>
                <div className='date-with-icon'>
                    <DatePicker
                        selected={qualificationData.issue_date ? moment(qualificationData.issue_date).toDate() : null}
                        onChange={(date) => handleDateChange("issue_date", date?.toISOString() || null)}
                        wrapperClassName="datePicker"
                        name="issue_date"
                    />
                    <img src={Images.calendar} className='calendar-icon'/>
                </div>
                <div className="error-message">{issueDateError}</div>
                <div className='input-title expiry-date'>Expiry Date</div>
                <div className='date-with-icon'>
                    <DatePicker
                        selected={qualificationData.expire_date ? moment(qualificationData.expire_date).toDate() : null}
                        onChange={(date) => handleDateChange("expire_date", date?.toISOString() || null)}
                        wrapperClassName="datePicker"
                        name="expire_date"
                    />
                    <img src={Images.calendar} className='calendar-icon'/>
                </div>
                <div className="error-message">{expireDateError}</div>
            </div>
            <div className='final-step-buttons'>
                <button
                    className='button'
                    onClick={handleNewQualification}
                >
                    Continue
                </button>
                <div
                    className='final-step-previous'
                    onClick={handlePreviousStep}
                >
                    Previous Step
                </div>
            </div>
        </div>
    )

}

export default QualificationFinalStep