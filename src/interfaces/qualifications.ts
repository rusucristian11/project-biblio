import User from './user'
import TrainingProvider from './training-provider'
import Modules from './modules'
import AwardingOrganisations from './awarding-organisations'

interface Qualification {
    id: number,
    user: User,
    training_provider: TrainingProvider,
    module: Modules,
    awarding_organisation: AwardingOrganisations,
    created_at: string,
    updated_at: string,
    deleted: boolean,
    certificate_name: string,
    certificate_image: string,
    qualification_title: string,
    issue_date: string,
    expire_date: string,
    archived: boolean
}

export default Qualification