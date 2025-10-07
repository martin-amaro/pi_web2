export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST',
  MOD: 'MOD',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

export const ROLE_INFO = {
  [ROLES.GUEST]: ['Invitado', 'Acceso limitado, solo lectura o revisión parcial del sistema.'],
  [ROLES.USER]: ['Usuario', 'Ejecuta tareas asignadas como entradas, salidas y movimientos.'],
  [ROLES.MOD]: ['Moderador', 'Supervisa y gestiona contenidos, acciones básicas de usuarios.'],
  [ROLES.ADMIN]: ['Administrador', 'Control total del sistema, usuarios, configuraciones y permisos.'],
  [ROLES.SUPER_ADMIN]: ['Super Admin', 'Acceso total al sistema, desarrollo y administración completa.'],
};
