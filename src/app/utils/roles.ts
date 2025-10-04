import { ROLES } from "../constants/roles";

export const getRole = (role: string) => {
    return {
        'ADMIN': 'Admin',
        'USER': 'Usuario'
    }[role] || 'Usuario'
}


export const hasRole = (user, ...allowedRoles) => {
  return user && allowedRoles.includes(user.role);
};

export const isAdmin = (user) => user?.role === ROLES.ADMIN;

export const canEditUsers = (user) =>
  [ROLES.ADMIN, ROLES.MOD].includes(user?.role);