import React, {useState} from 'react'
import {Route, Routes} from 'react-router'
import './App.scss'
import SignUp from "./components/SignUp"
import Footer from "./components/Footer/Footer"
import SignIn from "./components/SignIn"
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"
import HomePage from "./components/HomePage"
import NavigationWatcher from './NavigationWatcher'
import AddQualifications from "./components/AddQualifications"
import Settings from "./components/Settings"
import Navbar from "./components/NavBar"
import { useLocation } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import ViewAccount from "./components/ViewAccount"
import ShareProfileModal from "./components/ShareProfileModal"
import EditQualification from "./components/EditQualification"
import ArchivedQualifications from "./components/ArchivedQualifications"
import ManageSharedLinks from "./components/ManageSharedLinks"
function App() {

    const location = useLocation()

    const headerPaths = ['/homepage', '/add-qualifications', '/settings', '/view-account', '/edit-qualification', '/archived-qualifications', '/shared-links']
    const shouldRenderHeader = headerPaths.includes(location.pathname) || location.pathname.startsWith('/edit-qualification/')

    const navbarPaths = ['/homepage', '/add-qualifications', '/settings', '/view-account', '/edit-qualification', '/archived-qualifications', '/shared-links']
    const shouldRenderNavbar = navbarPaths.includes(location.pathname) || location.pathname.startsWith('/edit-qualification/')

    const footerPaths = ['/', '/register', '/reset-password']
    const shouldRenderFooter = footerPaths.includes(location.pathname)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            {shouldRenderHeader && <AppHeader openModal={openModal} />}
            <ShareProfileModal isOpen={isModalOpen} onClose={closeModal} />
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/reset-password" element={<ForgotPassword/>}/>
                <Route
                    path="/homepage"
                    element={
                        <NavigationWatcher>
                            <HomePage />
                        </NavigationWatcher>
                    }
                />
                <Route
                    path="/add-qualifications"
                    element={
                        <NavigationWatcher>
                            <AddQualifications />
                        </NavigationWatcher>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <NavigationWatcher>
                            <Settings />
                        </NavigationWatcher>
                    }
                />
                <Route
                    path="/view-account"
                    element={
                        <NavigationWatcher>
                            <ViewAccount />
                        </NavigationWatcher>
                    }
                />
                <Route
                    path="/edit-qualification/:qualificationId"
                    element={
                        <NavigationWatcher>
                            <EditQualification />
                        </NavigationWatcher>
                    }
                />
                <Route
                    path="/archived-qualifications"
                    element={
                        <NavigationWatcher>
                            <ArchivedQualifications />
                        </NavigationWatcher>
                    }
                />
                <Route
                    path="/shared-links"
                    element={
                        <NavigationWatcher>
                            <ManageSharedLinks />
                        </NavigationWatcher>
                    }
                />
            </Routes>
            {shouldRenderNavbar && <Navbar />}
            {shouldRenderFooter && <Footer />}
        </>
    )
}

export default App;
