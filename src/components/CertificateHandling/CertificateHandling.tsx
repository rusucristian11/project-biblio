import React, { useState } from 'react'
import './CertificateHandling.scss'
import Images from "../../assets/images";
import {useNavigate} from "react-router-dom"

interface CertificateHandlingProps {
    image: File | null,
    onNext: (image: File | null, certificateName: string | null ) => void,
    onBack: () => void
}

const CertificateHandling: React.FC<CertificateHandlingProps> = ({ image, onNext, onBack }) => {
    const imageExtension = getExtension(image?.name ? image?.name : '')
    const [certificateName, setCertificateName] = useState(removeExtension(image?.name ? image?.name : ''))
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

    const previousModal = isModalOpen ? 'modal-overlay open' : 'modal-overlay'
    const handleDeleteFile = () => {
        setCertificateName('')
        onBack()
    }

    const handleContinue = () => {
        onNext(image, certificateName)
    }

    const handlePrevious = () => {
        setIsModalOpen(true)
    }

    const handleModalConfirm = () => {
        navigate('/homepage')
        localStorage.setItem('activeLink', '/homepage')
    }

    const handleModalCancel = () => {
        setIsModalOpen(false)
    }

    let fileSizeInBytes = image?.size
    if (fileSizeInBytes !== undefined) {
        fileSizeInBytes = Math.round(fileSizeInBytes / 1024)
    }

    function getExtension(inputString : string) {
        const lastDotIndex = inputString.lastIndexOf('.')
        if (lastDotIndex === -1) {
            return ''
        }
        return inputString.substring(lastDotIndex)
    }

    function removeExtension(inputString : string) {
        const lastDotIndex = inputString.lastIndexOf('.')
        if (lastDotIndex === -1) {
            return inputString
        }
        return inputString.substring(0, lastDotIndex)
    }

    return (
        <div className="page certificate-handling">
            <div className='certificate-handling-step'>Step 1</div>
            <div className="certificate-handling-title">
                Add Certificate
            </div>
            <div className="certificate-handling-subtitle">
                Take a photo of your qualification certificate or upload an image as proof.
            </div>
            <div className="certificate-handling-box">
                <div className="certificate-handling-header">1 Image Uploaded</div>
                <div className="certificate-name-input">
                    <div className='input-title'>
                        Certificate Name
                    </div>
                    <input
                        type="text"
                        className='custom-input certificate-input'
                        value={certificateName}
                        onChange={(e) => setCertificateName(e.target.value)}
                    />
                </div>
                <div className="file-details">
                    <div className='img-file-description'>
                        <img
                            src={Images.document}
                            className="certificate-image"
                            alt=""
                        />
                        <div className="file-name-size">
                            <div className='certificate-name'>
                                {certificateName + imageExtension}
                            </div>
                            <div className='certificate-size'>
                                {fileSizeInBytes + ' KB'}
                            </div>
                        </div>
                    </div>
                    <img
                        src={Images.checkmark}
                        className="checkmark-img"
                        alt=""
                    />
                </div>
                <div className="delete-file" onClick={handleDeleteFile}>
                    Delete File
                </div>
            </div>
            <div className="certificate-handling-buttons">
                <button className="button certificate-continue" onClick={handleContinue}>
                    Continue
                </button>
                <div
                    className="certificate-previous"
                    onClick={handlePrevious}
                >
                    Previous Step
                </div>
            </div>
            {isModalOpen && (
                <div className={previousModal} onClick={handleModalCancel}>
                    <div className='modal-content delete-link' onClick={(e) => e.stopPropagation()}>
                        <div className='modal-header'>
                            <div className='modal-header-title title-delete-link'>
                                Are you sure you wish to exit?
                            </div>
                            <img
                                className='modal-close-button'
                                src={Images.closeButton}
                                onClick={handleModalCancel}
                                alt=""
                            />
                        </div>
                        <div className='modal-buttons-link'>
                            <button className="button modal-cancel" onClick={handleModalCancel}>
                                No, I Want To Stay
                            </button>
                            <button className=" button modal-confirm" onClick={handleModalConfirm}>
                                Yes, I Want To Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CertificateHandling
