import React, {useState} from 'react'
import './SignUp.scss'
import Images from '../../assets/images'
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"

interface SignUpFormState {
    password: string,
    confirm_password: string,
    first_name: string,
    last_name: string,
    role: string,
    email: string,
    phone_number: string,
    address_line_1: string,
    address_line_2: string,
    address_line_3: string,
    city: string,
    postcode: string
}


const SignUp: React.FC = () => {

    const [signUpFormData, setSignUpFormData] = useState<SignUpFormState>({
        "password": '',
        "confirm_password": '',
        "first_name": '',
        "last_name": '',
        "email": '',
        "phone_number": '',
        "role": '',
        "address_line_1": '',
        "address_line_2": '',
        "address_line_3": '',
        "city": '',
        "postcode": ''
    })

    const [passwordError, setPasswordError] = useState<string>('')
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
    const [firstNameError, setFirstNameError] = useState<string>('')
    const [lastNameError, setLastNameError] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [phoneNumberError, setPhoneNumberError] = useState<string>('')
    const [roleError, setRoleError] = useState<string>('')
    const [addressLine1Error, setAddressLine1Error] = useState<string>('')
    const [cityError, setCityError] = useState<string>('')
    const [postcodeError, setPostcodeError] = useState<string>('')

    const [isAccepted, setIsAccepted] = useState<boolean>(false)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const navigate = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setEmailError('')
        setPasswordError('')
        setConfirmPasswordError('')
        setFirstNameError('')
        setLastNameError('')
        setPhoneNumberError('')
        setRoleError('')
        setAddressLine1Error('')
        setCityError('')
        setPostcodeError('')
        // Validation for each input
        if (name === 'password') {
            if (!value || value.length < 8) {
                setPasswordError('Password must be at least 8 characters long.')
            } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) {
                setPasswordError('Password must contain at least one capital letter, one number, and one special character.')
            }
        } else if (name === 'confirm_password') {
            if (value !== signUpFormData.password) {
                setConfirmPasswordError('Passwords do not match.')
            } else {
                setConfirmPasswordError('')
            }
        } else if (name === 'first_name') {
            if (!value || value.length < 2) {
                setFirstNameError('Please enter your first name.')
            }
        } else if (name === 'last_name') {
            if (!value || value.length < 2) {
                setLastNameError('Please enter your last name.')
            }
        } else if (name === 'email') {
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailPattern.test(value)) {
                setEmailError('Please enter a valid email address.')
            }
        } else if (name === 'phone_number') {
            const phoneNumberPattern = /^\d*$/
            if (!value || !phoneNumberPattern.test(value) || value.length < 2) {
                setPhoneNumberError('Please enter your phone number.')
            }
        } else if (name === 'role') {
            if (!value || value.length < 2) {
                setRoleError('Please enter your role.')
            }
        } else if (name === 'address_line_1') {
            if (!value || value.length < 2) {
                setAddressLine1Error('Please enter your address.')
            }
        } else if (name === 'city') {
            if (!value || value.length < 2) {
                setCityError('Please enter your city.')
            }
        } else if (name === 'postcode') {
            const postCodePattern = /^\d*$/
            if (!value || !postCodePattern.test(value)) {
                setPostcodeError('Please enter your postcode.')
            }
        }

        setSignUpFormData(prevData => ({...prevData, [name]: value}))
    }

    const signInUser = async () => {
        try {
            const signInResponse = await axios.post(
                "https://biblio.nebulalabs.cc/api/token/",
                {
                    email: signUpFormData.email,
                    password: signUpFormData.password,
                },
                {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                        "X-CSRFTOKEN": "bOqRP83kbkmtMvwJrtuRFL6H3cqPzIaq9P3Ntq5K4b0AI8ddOlVE09RXxez1H0cx"
                    },
                }
            )

            const accessToken = signInResponse.data.access

            localStorage.setItem("access", accessToken)
            navigate("/homepage")
        } catch (error) {
            console.error("Error while signing in:", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsFormSubmitted(true)

        if (!isAccepted) {
            console.log("Please accept the terms and conditions.")
            return;
        }

        if (
            passwordError ||
            confirmPasswordError ||
            firstNameError ||
            lastNameError ||
            emailError ||
            phoneNumberError ||
            roleError ||
            addressLine1Error ||
            cityError ||
            postcodeError
        ) {
            console.log("Please fix the errors in the form before submitting.")
            return
        }
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await axios.post(
                "https://biblio.nebulalabs.cc/api/user/",
                signUpFormData
            )
            await signInUser()
        } catch (error) {
            console.error(error)
            setIsFormSubmitted(false)
        }
    }

    return (
        <div className='page-authentication sign-up-page'>
            <img
                src={Images.biblioLogo}
                className='logo'
                alt=""
            />
            <div className='register-form'>
                <div className='form-title'>Create your Biblio account</div>
                <div className='personal-details'>
                    <div className='line'/>
                    <div className='first-form-subtitle'>Personal Details</div>
                    <div className='input-title first-name'>First Name</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.first_name}
                        name="first_name"
                        data-testid="first-name-input"
                    />
                    {firstNameError && <div className="error-message">{firstNameError}</div>}
                    <div className='input-title surname'>Surname</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.last_name}
                        name="last_name"
                        data-testid="last-name-input"
                    />
                    {lastNameError && <div className="error-message">{lastNameError}</div>}
                    <div className='input-title role'>Role</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.role}
                        name="role"
                        data-testid="role-input"
                    />
                    {roleError && <div className="error-message">{roleError}</div>}
                    <div className='input-title telephone'>Telephone</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.phone_number}
                        name="phone_number"
                        data-testid="phone-number-input"
                    />
                    {phoneNumberError && <div className="error-message">{phoneNumberError}</div>}
                    <div className='input-title email-address'>Email Address</div>
                    <input
                        type="email"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.email}
                        name="email"
                        data-testid="email-input"
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                    <div className='input-title password'>Password</div>
                    <input
                        type="password"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.password}
                        name="password"
                        data-testid="password-input"
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                    <div className='input-title confirm-password'>Confirm Password</div>
                    <input
                        type="password"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.confirm_password}
                        name="confirm_password"
                        data-testid="confirm-password-input"
                    />
                    {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                </div>
                <div className='your-address'>
                    <div className='line'/>
                    <div className='second-form-subtitle'>Your Address</div>
                    <div className='input-title address-line-1'>Address Line 1</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.address_line_1}
                        name="address_line_1"
                        data-testid="address-line-1-input"
                    />
                    {addressLine1Error && <div className="error-message">{addressLine1Error}</div>}
                    <div className='input-title address-line-2'>Address Line 2(Optional)</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.address_line_2}
                        name="address_line_2"
                        data-testid="address-line-2-input"
                    />
                    <div className='input-title address-line-3'>Address Line 3(Optional)</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.address_line_3}
                        name="address_line_3"
                        data-testid="address-line-3-input"
                    />
                    <div className='input-title town-city'>Town / City</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.city}
                        name="city"
                        data-testid="city-input"
                    />
                    {cityError && <div className="error-message">{cityError}</div>}
                    <div className='input-title post-code'>Post Code</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={signUpFormData.postcode}
                        name="postcode"
                        data-testid="postcode-input"
                    />
                    {postcodeError && <div className="error-message">{postcodeError}</div>}
                </div>
                <div className='terms-conditions'>
                    <div className='line'/>
                    <div className='third-form-subtitle'>Biblio Terms & Conditions</div>
                    <div className='radio-button-accept'>
                        <input
                            type="checkbox"
                            className="check"
                            onClick={() => setIsAccepted(prevState => !prevState)}
                            data-testid="check-input"
                        />
                        <div className='accept'>
                            I accept the
                            <a href="https://google.com">Terms and Conditions</a>
                        </div>
                    </div>
                </div>
                <div className='line'/>
                <div className='register-login'>
                    <button
                        className='button register'
                        onClick={handleSubmit}
                    >
                        Create Account
                    </button>
                    <div className='sign-in'>
                        Already have an account?
                        <Link to="/" className='sign-in'>
                            Sign in.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignUp