export const getRole = (role: string) => {
    return {
        'ADMIN': 'Admin',
        'USER': 'Usuario'
    }[role] || 'Usuario'
}