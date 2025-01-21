interface User {
    id: number,
    user_detail?: {
        deleted?: boolean,
        token_code?: string
    },
    userpic: string,
    last_login?: string,
    is_superuser?: boolean,
    first_name: string,
    last_name: string,
    is_staff?: boolean,
    is_active?: string,
    date_joined: string,
    created_at: string,
    updated_at: string,
    deleted: boolean,
    email: string,
    full_name: string,
    phone_number: string,
    role: string,
    address_line_1: string,
    address_line_2: string,
    address_line_3: string,
    city: string,
    postcode: string
}

export default User