import React from 'react'
import './ManualHandling.scss'
import Images from "../../assets/images"
import { useNavigate } from 'react-router-dom'
import useAuthorizationInterceptor from "../../hooks/useAuthorizationInterceptor"
interface ManualHandlingProps {
    isOpen: boolean,
    onClose: () => void,
    qualificationId: number | null,
    onDelete: (qualificationId: number | null) => void
}
const ManualHandling: React.FC<ManualHandlingProps> = ({isOpen, onClose, qualificationId, onDelete}) => {

    const navigate = useNavigate()
    const api = useAuthorizationInterceptor()

    const handleEditQualification = () => {
        onClose()
        if (qualificationId !== null) {
            navigate(`/edit-qualification/${qualificationId}`)
        }
    }

    const handleArchivedQualifications = () => {
        onClose()
        localStorage.setItem('activeLink', '/settings')
        navigate('/archived-qualifications')
    }

    const deleteQualification = async () => {
        try {
            const response = await api.delete(
                `/qualifications/${qualificationId}/`
            )
            onDelete(qualificationId)
            onClose()
            console.log('Qualification deleted:', response.data)
        } catch (error) {
            console.error('Error deleting qualification:', error)
            alert('An error occurred while deleting the qualification.')
        }
    }

    const manualHandlingModal = isOpen ? 'modal-overlay open' : 'modal-overlay';
    if (!isOpen) {
        return null
    }

    return(
        <div className={manualHandlingModal} onClick={onClose} data-testid="modal-overlay">
            <div className='modal-content manual-handling' onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <div className='modal-header-title'>
                        Manual Handling
                    </div>
                    <img
                        className='modal-close-button'
                        src={Images.closeButton}
                        onClick={onClose}
                        alt=""
                    />
                </div>
                <div className='actions-buttons'>
                    <button
                        className='button edit'
                        onClick={() => handleEditQualification()}
                    >
                        Edit Qualification
                    </button>
                    <button
                        className='button archive'
                        onClick={handleArchivedQualifications}
                    >
                        Archive Qualification
                    </button>
                    <button
                        className='button delete'
                        onClick={deleteQualification}
                    >
                        Delete Qualification
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ManualHandling

