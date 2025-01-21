import React, {useState} from 'react';
import './ForgotPassword.scss';
import Images from '../../assets/images';
import {Link} from "react-router-dom";

interface ForgotPasswordState {
    email: string
}

const ForgotPassword: React.FC = () => {

    const [forgotPasswordFormData, setForgotPasswordFormData] = useState<ForgotPasswordState>({
        email: ''
    })

    const [emailError, setEmailError] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setEmailError('');

        if (name === 'email') {
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailPattern.test(value)) {
                setEmailError('Please enter a valid email address.');
            }
        }

        setForgotPasswordFormData(prevData => ({...prevData, [name]: value}))
    }

    const handleResetPassword = () => {
        if (!forgotPasswordFormData.email || emailError) {
            setEmailError('Please enter a valid email address.')
            return
        }

        const apiUrl = `https://biblio.nebulalabs.cc/api/user/request-reset-password/${encodeURIComponent(forgotPasswordFormData.email)}`
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('Password reset email sent successfully.')
                } else {
                    console.error('Error sending the password reset email.')
                }
            })
            .catch(error => {
                console.error('Network error occurred while sending the password reset email.', error)
            })
    }

    return (
        <div className='page-authentication forgot-password-page'>
            <img
                src={Images.biblioLogo}
                className='logo'
                alt=""
            />
            <div className='forgot-password-form'>
                <div className='form-title'>
                    Forgotten Password?
                </div>
                <div className='line forgot'/>
                <div className='reset-password'>
                    <div className='first-form-subtitle'>
                        No problem, just type in your email and we will send
                        you a link to reset your password.
                    </div>
                    <div className='input-title email'>Email Addresss</div>
                    <input
                        type="email"
                        data-testid="email-input"
                        className='custom-input'
                        onChange={handleChange}
                        value={forgotPasswordFormData.email}
                        name="email"
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                </div>
                <div className='line forgot'/>
                <div className='reset-new-account'>
                    <button
                        className='button forgot-password'
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </button>
                    <Link to="/" className='return-log-in'>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Doesn't matter, return to Sign In.
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword