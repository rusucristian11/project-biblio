import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavBar.scss'
import Images from '../../assets/images'

interface NavItem {
    path: string
    title: string
    icon: string
}

const navItems: NavItem[] = [
    {
        path: '/homepage',
        title: 'Home',
        icon: Images.profile
    },
    {
        path: '/add-qualifications',
        title: 'Add Qualifications',
        icon: Images.documentPlus
    },
    {
        path: '/settings',
        title: 'Settings',
        icon: Images.settings
    }
]

const Navbar: React.FC = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState<string | null>(null)

    const handleLinkClick = (link: string) => {
        setActiveLink(link)
        localStorage.setItem('activeLink', link)
    }

    useEffect(() => {
        const storedActiveLink = localStorage.getItem('activeLink')
        setActiveLink(storedActiveLink || location.pathname)
    }, [location.pathname])

    useEffect(() => {
        return () => {
            localStorage.removeItem('activeLink')
        }
    }, [])

    return (
        <div className="page-authentication navbar">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`navbar-item ${activeLink === item.path ? 'active' : ''}`}
                    onClick={() => handleLinkClick(item.path)}
                >
                    <div className="navbar-logo-container">
                        <img src={item.icon} className="navbar-logo" alt="" />
                    </div>
                    <div className="navbar-item-title">{item.title}</div>
                </Link>
            ))}
        </div>
    )
}

export default Navbar
