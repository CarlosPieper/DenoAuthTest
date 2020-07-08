export interface User {
    name: string,
    email: string,
    password: string,
    birthDate?: Date,
    gender?: string,
    description?: string,
    isPaid?: boolean,
    category?: string,
    subcategory?: string,
    profilePic?: File,
}
