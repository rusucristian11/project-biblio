import React, { useState } from 'react'
import Webcam from 'react-webcam'
import './AddCertificate.scss'
import Images from "../../assets/images";

interface AddCertificateProps {
    onNext: (image: File | null) => void
}

const AddCertificate: React.FC<AddCertificateProps> = ({ onNext }) => {
    const [cameraActive, setCameraActive] = useState(false)
    const webcamRef = React.useRef<Webcam | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imageFile, setImageFile] = useState<File | null>(null)

    const handleCapture = () => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc) {
            const blob = dataURItoBlob(imageSrc)
            const type = 'image/png'
            const file = new File([blob], 'captured_photo.png', { type })
            setImageFile(file)
            onNext(file)
        }
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImageFile(file)
            onNext(file)
        }
    }

    return (
        <div className='page add-certificate'>
            <div className='add-certificate-step'>Step 1</div>
            <div className='add-certificate-title'>Add Certificate</div>
            <div className='add-certificate-subtitle'>Take a photo of your qualification certificate or upload an image as proof.</div>
            <div className='add-certificate-buttons'>
                <label
                    htmlFor="upload-input"
                    className='button upload-picture'
                >
                    <img
                        src={Images.upload}
                        className='upload-icon'
                        alt=""
                    />
                    Upload Photo
                </label>
                <input
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    data-testid="file-input"
                />
                {!cameraActive ? (
                    <button
                        className='button take-photo'
                        onClick={() => setCameraActive(true)}
                        data-testid="next-button"
                    >
                        <img
                            src={Images.takePhoto}
                            className='take-photo-icon'
                            alt=""
                        />
                        Take Photo
                    </button>
                ) : (
                    <div
                        className="modal-overlay-camera"
                        data-testid="modal-overlay-camera"
                    >
                        <div className="modal-content-camera">
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotQuality={1}
                                screenshotFormat="image/png"
                            />
                            <button
                                className="capture-button"
                                onClick={handleCapture}
                                data-testid="capture-button"
                            />
                            <button
                                className="close-button"
                                onClick={() => setCameraActive(false)}
                            >
                                x
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddCertificate

function dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: mimeString })
}
