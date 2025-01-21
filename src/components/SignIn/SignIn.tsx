import React, {useEffect, useState} from 'react'
import './SignIn.scss'
import Images from '../../assets/images'
import {Link} from "react-router-dom"
import { EncryptStorage } from "encrypt-storage"
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignInFormState {
    email: string,
    password: string
}

const SignIn: React.FC = () => {
    const navigate = useNavigate()

    const encryptStorage = new EncryptStorage("SECRET_KEY")

    const[signInFormData, setSignInFormData] = useState<SignInFormState>({
        email: '',
        password: ''
    })

    const [rememberMe, setRememberMe] = useState(false)
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setEmailError('')
        setPasswordError('')

        if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!value || !emailPattern.test(value)) {
                setEmailError('Please enter a valid email address.')
            }
        } else if (name === 'password') {
            if (!value || value.length < 8) {
                setPasswordError('Password must be at least 8 characters long.')
            } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) {
                setPasswordError('Password must contain at least one capital letter, one number, and one special character.');
            }
        }

        setSignInFormData(prevData => ({...prevData, [name]: value}))
    }

    const handleCheck = () => {
        setRememberMe((rememberMe) => !rememberMe)
    }

    useEffect(() => {
        const storedEmail = localStorage.getItem('rememberedEmail')
        setRememberMe(!!storedEmail)
        if (storedEmail) {
            setRememberMe(true)
            setSignInFormData((prevData) => ({ ...prevData, email: storedEmail }))
        }
        setRememberMe(false)
    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if ( emailError || passwordError ) {
            return
        }
        try {
            const response = await axios.post(
                'https://biblio.nebulalabs.cc/api/token/',
                {
                    email: signInFormData.email,
                    password: signInFormData.password
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': 'bOqRP83kbkmtMvwJrtuRFL6H3cqPzIaq9P3Ntq5K4b0AI8ddOlVE09RXxez1H0cx'
                    }
                }
            )
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)

            if (rememberMe) {
                localStorage.setItem('rememberedEmail', signInFormData.email)
            } else {
                localStorage.removeItem('rememberedEmail')
            }
            navigate("/homepage")
        } catch (error) {
            alert('Wrong Credentials')
        }
    }

    useEffect(() => {
        const storedData = encryptStorage.getItem('loginCredentials')
        if(storedData) {
            setRememberMe(true)
            setSignInFormData(signInFormData)
        }
    }, [])

    return (
        <div className='page-authentication sign-in-page'>
            <img
                src={Images.biblioLogo}
                className='logo'
                alt=""
            />
            <div className='sign-in-form'>
                <div className='form-title'>
                    Sign In to Biblio
                </div>
                <div className='line sign'/>
                <div className='email-password'>
                    <div className='input-title email'>Email Addresss</div>
                    <input
                        type="email"
                        className='custom-input'
                        onChange={handleChange}
                        value={signInFormData.email}
                        name="email"
                        data-testid="email-input"
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                    <div className='input-title password'>Password</div>
                    <input
                        type="password"
                        className='custom-input'
                        onChange={handleChange}
                        value={signInFormData.password}
                        name="password"
                        data-testid="password-input"
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                    <div className='remember-me'>
                        <input
                            type='checkbox'
                            className='check-box'
                            onChange={handleCheck}
                            checked={rememberMe}
                        />
                        Remember me
                    </div>
                </div>
                <div className='line'/>
                <div className='reset-new-account'>
                    <button
                        className='button sign-in'
                        onClick={handleSubmit}
                    >
                        Sign In
                    </button>
                    <Link to="/reset-password" className='forgot'>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        I've forgotten my password
                    </Link>
                    <div className='create-account'>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Don't have an account?
                        <Link to="/register" className='register'>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn