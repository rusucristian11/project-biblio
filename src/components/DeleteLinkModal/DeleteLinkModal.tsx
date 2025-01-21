import React from 'react'
import './DeleteLinkModal.scss'
import Images from '../../assets/images'

interface DeleteLinkModalProps {
    isOpen: boolean,
    onClose: () => void,
    onDelete: () => void
}

const DeleteLinkModal: React.FC<DeleteLinkModalProps> = ({ isOpen, onClose, onDelete }) => {
    const deleteLinkModal = isOpen ? 'modal-overlay open' : 'modal-overlay'

    if (!isOpen) {
        return null;
    }

    const handleDelete = () => {
        onDelete()
        onClose()
    }

    return (
        <div className={deleteLinkModal} onClick={onClose} data-testid="modal-overlay">
            <div className='modal-content delete-link' onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <div className='modal-header-title title-delete-link'>
                        Are you sure you wish to delete this link?
                    </div>
                    <img
                        className='modal-close-button'
                        src={Images.closeButton}
                        onClick={onClose}
                        alt=""
                    />
                </div>
                <div className='modal-buttons-link'>
                    <button className='button keep-link' onClick={onClose}>
                        No, Keep Link
                    </button>
                    <button className='button delete-link' onClick={handleDelete}>
                        Yes, I Want To Delete Link
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteLinkModal
