import { ROLES } from "../constants/roles";

export const getRoleName = (role?: string) => {
  return {
    [ROLES.ADMIN]: "Administrador",
    [ROLES.USER]: "Usuario",
    [ROLES.MOD]: "Moderador",
    [ROLES.SUPER_ADMIN]: "Super Admin",
    [ROLES.GUEST]: "Invitado",
  }[role || ROLES.USER];
};

export const hasRole = (user: any, ...allowedRoles: string[]) => {
  return user && allowedRoles.includes(user.role);
};

export const isAdmin = (user: any) => user?.role === ROLES.ADMIN;
export const isUser = (user: any) => user?.role === ROLES.USER;
export const canEditUsers = (user: any) =>
  [ROLES.ADMIN, ROLES.MOD].includes(user?.role);
