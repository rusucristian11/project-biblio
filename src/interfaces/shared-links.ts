interface SharedLink {
    id: number,
    uuid: string,
    shared_user: number,
    recepient_name: string,
    recepient_email: string,
    deleted: boolean,
    url: string
}

export default SharedLink