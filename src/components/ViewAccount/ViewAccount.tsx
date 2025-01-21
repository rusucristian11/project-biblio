import React, {useEffect, useState} from 'react'
import './ViewAccount.scss'
import Images from '../../assets/images'
import { Link } from "react-router-dom"
import useUserData from "../../hooks/useUserData"
import useAuthorizationInterceptor from "../../hooks/useAuthorizationInterceptor"

interface ViewAccountState {
    userpic?: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    role: string,
    address_line_1: string,
    address_line_2: string,
    address_line_3: string,
    city: string,
    postcode: string
}


const ViewAccount: React.FC = () => {

    const { userData } = useUserData()
    const api = useAuthorizationInterceptor()

    const [viewAccountData, setViewAccountData] = useState<ViewAccountState>({
        userpic: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        role: '',
        address_line_1: '',
        address_line_2: '',
        address_line_3: '',
        city: '',
        postcode: ''
    })

    useEffect(() => {
        if (userData) {
            setViewAccountData({
                userpic: userData.userpic || '',
                password: '',
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                email: userData.email || '',
                phone_number: userData.phone_number || '',
                role: userData.role || '',
                address_line_1: userData.address_line_1 || '',
                address_line_2: userData.address_line_2 || '',
                address_line_3: userData.address_line_3 || '',
                city: userData.city || '',
                postcode: userData.postcode || ''
            })
        }
    }, [userData])

    const [isUserpicUpdated, setIsUserpicUpdated] = useState(false);
    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false)
    const [passwordError, setPasswordError] = useState<string>('')
    const [firstNameError, setFirstNameError] = useState<string>('')
    const [lastNameError, setLastNameError] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [phoneNumberError, setPhoneNumberError] = useState<string>('')
    const [roleError, setRoleError] = useState<string>('')
    const [addressLine1Error, setAddressLine1Error] = useState<string>('')
    const [cityError, setCityError] = useState<string>('')
    const [postcodeError, setPostcodeError] = useState<string>('')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setEmailError('')
        setPasswordError('')
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
        }  else if (name === 'first_name') {
            if (!value || value.length < 2) {
                setFirstNameError('Please enter your first name.')
            }
        } else if (name === 'last_name') {
            if (!value || value.length < 2) {
                setLastNameError('Please enter your last name.')
            }
        } else if (name === 'email') {
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

        setViewAccountData(prevData => ({...prevData, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsFormSubmitted(true)

        if (
            passwordError ||
            firstNameError ||
            lastNameError ||
            phoneNumberError ||
            roleError ||
            addressLine1Error ||
            cityError ||
            postcodeError
        ) {
            console.log('Please fix the errors in the form before submitting.')
            return;
        }

        try {
            const dataToSend = { ...viewAccountData }

            if (!isUserpicUpdated && dataToSend.userpic) {
                delete dataToSend.userpic
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await api.patch('/user/', dataToSend)
        } catch (error) {
            console.error(error)
            setIsFormSubmitted(false)
        }
    }

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const base64Image = reader.result as string;
                setViewAccountData(prevData => ({
                    ...prevData,
                    userpic: base64Image,
                }))
                setIsUserpicUpdated(true)
            }
            reader.readAsDataURL(file)
        }
    }
    const handlePasswordUpdate = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { userpic, ...passwordUpdateData } = viewAccountData

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await api.patch('/user/', passwordUpdateData)
            setPasswordError('')
            setIsPasswordUpdated(true)
            setViewAccountData(prevData => ({
                ...prevData,
                password: '',
            }))
        } catch (error) {
            console.error('Password update error:', error)
        }
    }

    return (
        <div className='page view-account'>
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
                <div className='your-account'>
                    Your Account
                </div>
            </div>
            <div className='view-account-form'>
                <div className='form-title'>Update Your Details</div>
                <div className='personal-details'>
                    <div className='line'/>
                    <div className='first-form-subtitle'>Personal</div>
                    <img
                        src={viewAccountData.userpic || Images.profile} // Use the userpic state or default image
                        className='profile-picture'
                        alt="Profile"
                    />
                    <div className="update-profile-picture">
                        <label htmlFor="profile-picture-input">Update Profile Picture</label>
                        <input
                            type="file"
                            id="profile-picture-input"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                            style={{ display: "none" }}
                        />
                    </div>
                    <div className='line'/>
                    <div className='input-title first-name'>First Name</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.first_name}
                        name="first_name"
                    />
                    {firstNameError && <div className="error-message">{firstNameError}</div>}
                    <div className='input-title surname'>Surname</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.last_name}
                        name="last_name"
                    />
                    {lastNameError && <div className="error-message">{lastNameError}</div>}
                    <div className='input-title role'>Role</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.role}
                        name="role"
                    />
                    {roleError && <div className="error-message">{roleError}</div>}
                    <div className='input-title telephone'>Telephone</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.phone_number}
                        name="phone_number"
                    />
                    {phoneNumberError && <div className="error-message">{phoneNumberError}</div>}
                    <div className='input-title email-address'>Email Address</div>
                    <input
                        type="email"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.email}
                        name="email"
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                </div>
                <div className='line'/>
                <div className='password-part'>
                    <div className='password-title'>
                        Password
                    </div>
                    <div className='input-title password'>Password</div>
                    <input
                        type="password"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.password}
                        name="password"
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                    {isPasswordUpdated ? (
                        <div className='update-password'>
                            Password Updated
                        </div>
                    ) : (
                        <div className='update-password' onClick={handlePasswordUpdate}>
                            Update Password
                        </div>
                    )}
                </div>
                <div className='your-address'>
                    <div className='line'/>
                    <div className='second-form-subtitle'>Your Address</div>
                    <div className='input-title address-line-1'>Address Line 1</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.address_line_1}
                        name="address_line_1"
                    />
                    {addressLine1Error && <div className="error-message">{addressLine1Error}</div>}
                    <div className='input-title address-line-2'>Address Line 2(Optional)</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.address_line_2}
                        name="address_line_2"
                    />
                    <div className='input-title address-line-3'>Address Line 3(Optional)</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.address_line_3}
                        name="address_line_3"
                    />
                    <div className='input-title town-city'>Town / City</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.city}
                        name="city"
                    />
                    {cityError && <div className="error-message">{cityError}</div>}
                    <div className='input-title post-code'>Post Code</div>
                    <input
                        type="text"
                        className="custom-input"
                        onChange={handleChange}
                        value={viewAccountData.postcode}
                        name="postcode"
                    />
                    {postcodeError && <div className="error-message">{postcodeError}</div>}
                </div>
                <div className='line'/>
                <div className='register-login'>
                    <button
                        className='button register'
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )

}

export default ViewAccount