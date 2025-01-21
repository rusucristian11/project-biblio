import React, {useState} from 'react'
import Images from '../../assets/images'
import Qualification from "../../interfaces/qualifications"
import './QualificationCard.scss'
import ManualHandling from "../ManualHandling"

interface QualificationCardProps {
    qualification: Qualification,
    onDelete: (qualificationId: number | null) => void
}

const QualificationCard: React.FC<QualificationCardProps> = ({ qualification, onDelete}) => {

    const [isManualHandlingModalOpen, setManualHandlingModalOpen] = useState(false)
    const handleModalOpen = () => {
        setManualHandlingModalOpen(true)
    }

    return (
        <div className="qualification-card" data-testid="qualification-card">
            <div className="qualification-block">
                <div className="qualification-left">
                    <img src={Images.checkmarkBlue} className="verified-check" alt="" />
                    <div className="qualification q-main">
                        <div className="qualification-title" data-testid="qualification-title">Qualification</div>
                        <div className="qualification-type" data-testid="certificate-name">{qualification.certificate_name}</div>
                    </div>
                </div>
                <img
                    src={Images.threeDotsVertical}
                    className="three-dots-settings"
                    alt=""
                    onClick={handleModalOpen}
                    data-testid="three-dots-icon"
                />
            </div>
            <div className="qualification-second-block">
                <div className="qualification qualification-module">
                    <div className="qualification-title module">Module</div>
                    <div className="qualification-type module-type" data-testid="module-name">{qualification.module.name}</div>
                </div>
                <div className="module-data training-provider">
                    <img src={Images.profile} className="module-icon training-provider" alt="" />
                    <div className="qualification training-provider-data">
                        <div className="qualification-title">Training Provider</div>
                        <div className="qualification-type training-provider-name" data-testid="provider-name">{qualification.training_provider.name}</div>
                    </div>
                </div>
                <div className="module-data awarding-organisation">
                    <img src={Images.profile} className="module-icon awarding-organisation" alt="" />
                    <div className="qualification awarding-organisation-data">
                        <div className="qualification-title">Awarding Organisation</div>
                        <div className="qualification-type awarding-organisation-name" data-testid="organisation-name">{qualification.awarding_organisation.name}</div>
                    </div>
                </div>
                <div className="line dotted" />
                <div className="qualification-date">
                    <div className="qualification dates issue-date">
                        <div className="qualification-title issue-date-title">Issue Date</div>
                        <div className="qualification-type issued-in" data-testid="issue-date">{qualification.issue_date.substring(0, 10)}</div>
                    </div>
                    <div className="qualification dates expiry-date">
                        <div className="qualification-title expiry-date-title">Expiry Date</div>
                        <div className="qualification-type expire-in" data-testid="expiry-date">{qualification.expire_date.substring(0, 10)}</div>
                    </div>
                </div>
            </div>
            {isManualHandlingModalOpen && (
                <ManualHandling
                    isOpen={isManualHandlingModalOpen}
                    onClose={() => setManualHandlingModalOpen(false)}
                    qualificationId={qualification.id}
                    onDelete={onDelete}
                />
            )}
        </div>
    )
}

export default QualificationCard
