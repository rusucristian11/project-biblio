import React from 'react'
import './Settings.scss'
import {Link, useNavigate} from "react-router-dom"
import Images from "../../assets/images"
import useUserData from "../../hooks/useUserData"

const Settings: React.FC = () => {
    const navigate = useNavigate()
    const { userData } = useUserData()
    const handleLogout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('activeLink')
        navigate("/")
    }

    return (
        <div className="page settings">
            <div className="page-title">
                Settings
            </div>
            <Link
                to='/view-account'
                className="view-account-block">
                <img
                    src={userData?.userpic || Images.profile}
                    className="profile-picture"
                    alt=""
                />
                <div className="profile-name">
                    {userData?.full_name}
                </div>
                <div className="description">
                    View Your Account
                </div>
            </Link>
            <div className="settings-menu">
                <Link
                    to='/shared-links'
                    className="menu sharedlinks"
                >
                    <img
                        src={Images.sharedLinks}
                        className="img share-link"
                        alt=""
                    />
                    <div className="block-title">
                        Shared Links
                    </div>
                </Link>
                <div className="menu archive">
                    <img
                        src={Images.archive}
                        className="img archive"
                        alt=""
                    />
                    <div className="block-title">
                        Archive
                    </div>
                </div>
                <div className="menu alerts">
                    <img
                        src={Images.alerts}
                        className="img alerts"
                        alt=""
                    />
                    <div className="block-title">
                        Alerts
                    </div>
                </div>
                <div
                    className="menu sign-out"
                    onClick={handleLogout}
                >
                    <img
                        src={Images.signOut}
                        className="img sign-out"
                        alt=""
                    />
                    <div className="block-title">
                        Sign Out
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings