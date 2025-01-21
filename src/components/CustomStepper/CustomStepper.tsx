import React, { useState } from 'react'
import {
    Stepper,
    Step,
    LinearProgress,
    StepConnector,
} from '@mui/material'
import './CustomStepper.scss'
import AddCertificate from '../AddCertificate'
import CertificateHandling from "../CertificateHandling"
import QualificationFinalStep from "../QualificationFinalStep"
import NewQualificationSuccess from "../NewQualificationSuccess"

const steps = ['Add Certificate', 'Step 2', 'Step 3', 'Step 4']

const CustomStepper = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [certificateName, setCertificateName] = useState<string | null>(null)
    const handleNextWithImage = (image: File | null) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setImageFile(image)
    }

    const handleNextWithImageAndCertificateName = (image: File | null, certificateName: string | null) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setImageFile(image)
        setCertificateName(certificateName)
    }
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
    return (
        <div
            className="custom-stepper"
            data-testid="custom-stepper"
        >
            <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<StepConnector className="qonto-step-connector" />}
            >
                {steps.map((stepLabel, index) => (
                    <Step key={index} />
                ))}
            </Stepper>
            <LinearProgress
                variant="determinate"
                value={(activeStep / (steps.length - 1)) * 100}
                style={{ width: '100%', marginTop: '16px' }}
            />
            {activeStep === 0 && (
                <AddCertificate onNext={(image) => handleNextWithImage(image)} />
            )}
            {activeStep === 1 && (
                <CertificateHandling image={imageFile} onNext={handleNextWithImageAndCertificateName} onBack={handleBack} />
            )}
            {activeStep === 2 && (
                <QualificationFinalStep onNext={handleNext} onBack={handleBack} image={imageFile} certificateName={certificateName || ""} />
            )}
            {activeStep === 3 && (
                <NewQualificationSuccess />
            )}
        </div>
    )
}
export default CustomStepper
