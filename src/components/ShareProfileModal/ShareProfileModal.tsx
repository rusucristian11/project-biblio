import React, {useEffect, useState} from 'react'
import './ShareProfileModal.scss'
import Images from "../../assets/images"
import useAuthorizationInterceptor from "../../hooks/useAuthorizationInterceptor"

interface ModalProps {
    isOpen: boolean,
    onClose: () => void
}

interface ModalFormData {
    recipientEmail: string,
    recipientName: string
}

const ShareProfileModal: React.FC<ModalProps> = ({isOpen, onClose}) => {

    const[shareModalData, setShareModalData] = useState<ModalFormData>({
        recipientEmail: '',
        recipientName: ''
    })

    const api = useAuthorizationInterceptor()

    const [emailError, setEmailError] = useState<string>('')
    const [nameError, setNameError] = useState<string>('')

    useEffect(() => {
        if (isOpen) {
            setShareModalData({
                recipientEmail: '',
                recipientName: ''
            })
        }
    }, [isOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setEmailError('')
        setNameError('')

        if (name === 'recipientEmail') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!value || !emailPattern.test(value)) {
                setEmailError('Please enter a valid email address.')
            }
        } else if (name === 'recipientName') {
            if (!value || value.length < 2) {
                setNameError('Please enter the recipient name.')
            }
        }

        setShareModalData(prevData => ({...prevData, [name]: value}))
    }

    const modalClassName = isOpen ? 'modal-overlay open' : 'modal-overlay';
    if (!isOpen) {
        return null
    }

    const handleShareClick = () => {
        const apiPayload = {
            recepient_name: shareModalData.recipientName,
            recepient_email: shareModalData.recipientEmail
        }

        api
            .post('/qualifications/shared-links/', apiPayload)
            .then((response) => {
                onClose();
                console.log('API call success:', response.data)
                setShareModalData({
                    recipientEmail: '',
                    recipientName: ''
                })
            })
            .catch((error) => {
                console.error('API call error:', error)
            })
    }

    return (
        <div className={modalClassName} onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <div className='modal-header-title'>
                        Share Your Profile
                    </div>
                    <img
                        className='modal-close-button'
                        src={Images.closeButton}
                        onClick={onClose}
                        alt="Close Button"
                    />
                </div>
                <div className='modal-form'>
                    <div className='form-title'>
                        Your Recipient
                    </div>
                    <div className='line' />
                    <div className='form-subtitle'>
                        Email your receipient with a unique profile link.
                        You can manage this link in Settings.
                    </div>
                    <div className='input-title email'>Recipient Email</div>
                    <input
                        type="text"
                        className='custom-input'
                        onChange={handleChange}
                        value={shareModalData.recipientEmail}
                        name="recipientEmail"
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                    <div className='input-title recipient-name'>Recipient Name</div>
                    <input
                        type="email"
                        className='custom-input'
                        onChange={handleChange}
                        value={shareModalData.recipientName}
                        name="recipientName"
                    />
                    {nameError && <div className="error-message">{nameError}</div>}
                    <div className='line' />
                    <button
                        className='button modal'
                        onClick={handleShareClick}
                    >
                        Share Via Email
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShareProfileModal
