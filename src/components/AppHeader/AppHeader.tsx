import React from 'react'
import './AppHeader.scss'
import Images from "../../assets/images"
interface AppHeaderProps {
    openModal: () => void
}
const AppHeader: React.FC<AppHeaderProps> = ({ openModal }) => {

    return(
        <div className='page-authentication app-header'>
            <img
                src={Images.biblioLogo}
                className="biblio-logo"
                alt=""
            />
            <div className="right-part">
                <img
                    src={Images.notificationBell}
                    className="header-logo"
                    alt="Biblio Logo"
                />
                <img
                    src={Images.share}
                    className="header-logo"
                    alt="Share"
                    onClick={openModal}
                />
            </div>
        </div>
    )
}

export default AppHeader