import React, {useState} from "react"
import './ManageSharedLinks.scss'
import useGetSharedLinks from "../../hooks/useGetSharedLinks"
import {Link} from "react-router-dom"
import Images from "../../assets/images"
import DeleteLinkModal from "../DeleteLinkModal"
import useAuthorizationInterceptor from "../../hooks/useAuthorizationInterceptor"

const ManageSharedLinks: React.FC = () => {

    const {sharedLinks, setSharedLinks} = useGetSharedLinks()

    const [selectedId, setSelectedId] = useState<number | null>(null)
    const api = useAuthorizationInterceptor()
    const handleDeleteLink = async (id: number) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await api.delete(
                `/qualifications/shared-links/${id}/`
            )

            setSharedLinks(prevSharedLinks => {
                if (prevSharedLinks) {
                    return prevSharedLinks.filter(link => link.id !== id)
                }
                return []
            })
        } catch (error) {
            console.error('Error deleting link:', error)
        }
    }

    return (
        <div className='page shared-links'>
            <div className='top-page'>
                <Link
                    to='/settings'
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
                <div className='manage-links'>
                    Manage Links
                </div>
            </div>
            <div className='shared-links-container'>
                <div className='shared-links-title'>
                    Previously Generated
                </div>
                {sharedLinks?.length && sharedLinks.length > 0 ? (
                    sharedLinks.map((shared, index) => (
                        <div
                            className='shared-link'
                            key={index}
                        >
                            <div className='line'/>
                            <div className='img-link-for'>
                                <img
                                    src={Images.sharedLinks}
                                    className="img share-link"
                                    alt=""
                                />
                                <div className='link-for'>
                                    <a
                                        href={sharedLinks[index].url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='link'
                                    >
                                        {sharedLinks[index].url}
                                    </a>
                                    <div className='for'>
                                        For: {sharedLinks[index].recepient_name}
                                    </div>
                                </div>
                            </div>
                            <button
                                className='button delete-link'
                                onClick={() => setSelectedId(sharedLinks[index].id)}
                            >
                                Delete Link
                            </button>
                        </div>
                    ))
                ) : (
                    <div className='shared-links-empty-state'>
                        <div className='qualification empty-state-text'>
                            <div className='qualification-title empty-state-title'>
                                Get Started
                            </div>
                            <div className='qualification-type empty-state-subtitle'>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                It's currently empty in here, go ahead and share some links.
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <DeleteLinkModal
                isOpen={selectedId !== null}
                onClose={() => setSelectedId(null)}
                onDelete={() => {
                    if (selectedId) {
                        handleDeleteLink(selectedId)
                        setSelectedId(null)
                    }
                }}
            />
        </div>
    )
}

export default ManageSharedLinks
